import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faCamera } from "@fortawesome/free-solid-svg-icons";
import { Input } from "@chakra-ui/react";
import { PopoverBody, PopoverContent } from "./../ui/popover";
import addStatus from "../../services/addStatus";

const AddStatus = ({ onClose }) => {
  const [media, setMedia] = useState([]);
  const [captions, setCaptions] = useState([]);

  const handleSubmit = async () => {
    try {
      const statusData = media.map((file, index) => ({
        file,
        caption: captions[index] || "",
      }));

      const response = await addStatus(statusData);
      console.log(response);
      onClose();
    } catch (error) {
      console.log("Error occurred in adding status:", error);
    }
  };

  const handleMediaChange = (e) => {
    const files = Array.from(e.target.files);
    setMedia(files);
    setCaptions(new Array(files.length).fill("")); // Initialize captions array
  };

  const handleCaptionChange = (index, value) => {
    const updatedCaptions = [...captions];
    updatedCaptions[index] = value;
    setCaptions(updatedCaptions);
  };

  return (
    <div className="z-50">
      <PopoverContent className="bg-gray-950 rounded-3xl overflow-hidden shadow-2xl w-144 min-w-2xl animate-scale-in relative z-10 border border-gray-800z-50">
        <PopoverBody>
          <div>
            <div className="p-6 border-b border-gray-800/50 relative">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-[#F472B6] via-[#3B82F6] to-indigo-500 bg-clip-text text-transparent animate-background">
                  New Status
                </h2>
              </div>
            </div>

            <div className="p-6 border-b border-gray-800/20 relative">
              <div className="space-y-6">
                <div className="flex justify-center">
                  <label
                    htmlFor="media-upload"
                    className="w-24 h-24 rounded-2xl bg-gradient-to-r from-indigo-500 via-pink/50 to-blue p-0.5 hover:shadow-lg transition-all duration-300 cursor-pointer"
                  >
                    <div className="w-full h-full rounded-2xl bg-gray-900 flex items-center justify-center">
                      <FontAwesomeIcon
                        icon={faCamera}
                        className="text-2xl text-gray-400"
                      />
                    </div>
                  </label>
                  <input
                    id="media-upload"
                    type="file"
                    name="media"
                    multiple
                    className="hidden"
                    onChange={handleMediaChange}
                  />
                </div>

                {media.length > 0 && (
                  <div className="flex flex-col gap-4 mt-4">
                    {media.map((file, index) => (
                      <div key={index} className="flex items-center gap-4">
                        {file.type.startsWith("image/") && (
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`media-preview-${index}`}
                            className="w-16 h-16 rounded-lg"
                          />
                        )}
                        {file.type.startsWith("video/") && (
                          <video
                            src={URL.createObjectURL(file)}
                            controls
                            className="w-16 h-16 rounded-lg"
                          />
                        )}
                        <Input
                          value={captions[index]}
                          placeholder="Caption..."
                          onChange={(e) =>
                            handleCaptionChange(index, e.target.value)
                          }
                          className="w-full bg-gray-900 rounded-md px-4 py-3"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <button
            className="w-full bg-gradient-to-r from-[#3B82F6]/70 via-[#F472B6]/70 to-[#3B82F6]/70 text-white py-3 rounded-xl transition-all flex items-center justify-center space-x-2"
            onClick={handleSubmit}
          >
            <FontAwesomeIcon icon={faUsers} />
            <span>Add Status</span>
          </button>
        </PopoverBody>
      </PopoverContent>
    </div>
  );
};

export default AddStatus;
