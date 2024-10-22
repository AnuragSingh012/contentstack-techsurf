import React, { useEffect, useState } from "react";
import Contentstack from "contentstack";

const RightSidebar = ({
  selectedComponent,
  importComponents,
  updateComponent,
}) => {
  const [jsonOutput, setJsonOutput] = useState({});
  const [isDataModified, setIsDataModified] = useState(false);
  const [isDataImported, setIsDataImported] = useState(false);

  const Stack = Contentstack.Stack({
    api_key: import.meta.env.VITE_API_KEY,
    access_token: import.meta.env.VITE_ACCESS_TOKEN,
    environment: "development",
  });

  const fetchDataFromContentstack = async () => {
    try {
      const contentPageQuery = Stack.ContentType("ContentPage").Query();
      const visualsQuery = Stack.ContentType("Visuals").Query();

      const [contentPageResponse, visualsResponse] = await Promise.all([
        contentPageQuery.toJSON().find(),
        visualsQuery.toJSON().find(),
      ]);

      const fetchedData = {
        content: contentPageResponse[0].fields,
        visuals: visualsResponse[0].fields,
      };

      importComponents(fetchedData);
      setIsDataImported(true);
    } catch (error) {
      console.error("Error fetching data from Contentstack:", error);
    }
  };


  const handleFieldChange = (field, value) => {
    if (selectedComponent) {
      const updatedComponent = { ...selectedComponent, [field]: value };
      updateComponent(updatedComponent);
      setIsDataModified(true);
    }
  };


  const saveChangesToContentstack = async () => {
    try {
      const updatedFields = { ...selectedComponent };
      const contentTypeUID = "ContentPage";
      const entryUID = "your-entry-uid";

      await Stack.ContentType(contentTypeUID).Entry(entryUID).update({
        entry: updatedFields,
      });

      setIsDataModified(false);
      console.log("Entry updated successfully");
    } catch (error) {
      console.error("Error saving data to Contentstack:", error);
    }
  };


  useEffect(() => {
    if (selectedComponent) {
      setJsonOutput(selectedComponent);
    }
  }, [selectedComponent]);

  return (
    <div className="w-1/4 bg-white h-screen flex flex-col p-6 border-l border-gray-200">
      <h2 className="text-xl font-semibold mb-4">Right Sidebar</h2>
      <button
        onClick={fetchDataFromContentstack}
        className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors mb-4"
      >
        Import Content
      </button>
      {selectedComponent && (
        <div className="mt-4 flex-grow overflow-y-auto">
          <h3 className="text-lg font-medium mb-2">Edit Component</h3>
          <input
            type="text"
            placeholder="Title"
            value={selectedComponent.title}
            onChange={(e) => handleFieldChange("title", e.target.value)}
            className="border border-gray-300 rounded-lg p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Description"
            value={selectedComponent.description}
            onChange={(e) => handleFieldChange("description", e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
          />
        </div>
      )}
      
      {isDataImported && isDataModified && (
        <button
          onClick={saveChangesToContentstack}
          className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition-colors mt-4"
        >
          Save Changes
        </button>
      )}
      <div className="mt-6 p-4 border border-gray-300 rounded-lg bg-gray-50 flex-shrink-0 max-h-60 overflow-y-auto">
        <h3 className="text-lg font-medium mb-2">JSON Output</h3>
        <pre className="whitespace-pre-wrap">
          {JSON.stringify(jsonOutput, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default RightSidebar;
