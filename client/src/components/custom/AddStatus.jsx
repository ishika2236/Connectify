import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faCamera } from "@fortawesome/free-solid-svg-icons";
import { Input } from "@chakra-ui/react";
import {
  PopoverBody,
  PopoverContent,
} from "./../ui/popover";
import addStatus from "../../services/addStatus";

const AddStatus = () => {
  const [media, setMedia] = useState([]);
  const [caption, setCaption] = useState("");
  const handleSubmit = async()=>{
    console.log("submitting");
    try {
        const response = await addStatus(media, caption);
        console.log(response);
    } catch (error) {
        console.log("error occured in adding status");
    } 
  }

  const handleMediaChange = (e) => {
    setMedia(Array.from(e.target.files)); 
  };

  return (
    <div>
      <PopoverContent className="bg-gray-950 rounded-3xl overflow-hidden shadow-2xl w-144 min-w-2xl animate-scale-in relative z-10 border border-gray-800">
        <PopoverBody>
          <div>
            {/* Header */}
            <div className="p-6 border-b border-gray-800/50 relative">
              <div className="flex items-center justify-between">
                <h2
                  className="text-2xl font-bold bg-gradient-to-r from-[#F472B6] via-[#3B82F6] to-indigo-500 bg-clip-text text-transparent animate-background"
                  style={{
                    backgroundSize: "200% 100%",
                  }}
                >
                  New Status
                </h2>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/10 via-pink/20 to-blue/10 blur-xl z-[-1]"></div>
            </div>

            {/* Media and Caption */}
            <div className="p-6 border-b border-gray-800/20 relative">
              <div className="space-y-6">
                {/* Media Upload */}
                <div className="flex justify-center">
                  <label
                    htmlFor="media-upload"
                    className="w-24 h-24 rounded-2xl bg-gradient-to-r from-indigo-500 via-pink/50 to-blue p-0.5 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 cursor-pointer"
                  >
                    <div className="w-full h-full rounded-2xl bg-gray-900 flex items-center justify-center backdrop-blur-xl">
                      <FontAwesomeIcon
                        icon={faCamera}
                        className="text-2xl text-gray-400 group-hover:text-pink-400 transition-colors"
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

                {/* Preview Media */}
                {media.length > 0 && (
                  <div className="flex gap-2 mt-4 flex-wrap">
                    {media.map((file, index) => {
                      if (file.type.startsWith("image/")) {
                        return (
                          <div key={index} className="w-16 h-16 rounded-lg overflow-hidden">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`media-preview-${index}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        );
                      } else if (file.type.startsWith("video/")) {
                        return (
                          <div key={index} className="w-16 h-16 rounded-lg overflow-hidden">
                            <video
                              src={URL.createObjectURL(file)}
                              controls
                              className="w-full h-full object-cover"
                            />
                          </div>
                        );
                      } else {
                        return (
                          <div key={index} className="w-32 h-32 flex items-center justify-center border border-gray-600 rounded-lg">
                            <span className="text-gray-500 text-xs">Unsupported</span>
                          </div>
                        );
                      }
                    })}
                  </div>
                )}

                {/* Caption Upload */}
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Caption</label>
                  <Input
                    value={caption}
                    name="caption"
                    onChange={(e) => setCaption(e.target.value)}
                    type="text"
                    placeholder="Caption..."
                    className="w-full bg-gray-900 rounded-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-pink/70 transition-all placeholder-gray-500 border border-gray-800 hover:border-pink/40"
                  />
                </div>
              </div>
            </div>
          </div>

          
          <button
            className="w-full bg-gradient-to-r from-[#3B82F6]/70 via-[#F472B6]/70 to-[#3B82F6]/70 text-white py-3 rounded-xl transition-all flex items-center justify-center space-x-2 hover:shadow-lg hover:shadow-pink/20"
            onClick={() => handleSubmit()}
          >
            <FontAwesomeIcon icon={faUsers}></FontAwesomeIcon>
            <span>Add Status</span>
          </button>
        </PopoverBody>
      </PopoverContent>
    </div>
  );
};

export default AddStatus;
