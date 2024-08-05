// import { create } from 'zustand'
// import { subscribeWithSelector } from 'zustand/middleware'
// import { stickers } from '../constants'

// // define the initial state
// const initialState = {
//     //default sticker
//     activeSticker: stickers[0],
//     material: {
//         name: 'Basic',
//         roughness: 0.8
//     },
//     apparel_data: {
//         id: null,
//         //set frontpart as the default
//         activePart:'Front',
//         activeApparelPart_data: {
//             //default
//             'Front': {
//                 position: "center",
//                 sticker: stickers[0],
//                 stickerSize: "Large",
//               },
//         }
//     },
//     bleed: false,
//     // Purpose: Represents the ID/index of the apparel being edited.
//     // Set to null when no apparel is being edited.
//     // Example: If editConfigId is not null, the user is editing the apparel with that ID/index.
//     editConfigId: null,
// }

// export default create(subscribeWithSelector((set) => {
//         return {
//             ...initialState,
//             //Orbitcontrols
//             controls:null,
//             configurations: [], //all configs
//             downloadFnc: null,
//             updateFnc: (fnc) => {
//                 set(() => {
//                     return {
//                         downloadFnc: fnc
//                     } 
//                 })
//             },
//             updateActiveSticker: (sticker) => {
//                 set(() => {
//                     return {
//                         activeSticker: sticker
//                     } 
//                 })
//             },
//             updateBleed: (value) => {
//                 set(() => {
//                     return {
//                         bleed: value
//                     } 
//                 })
//             },
//             updateMaterial: (property) => {
//                 set(() => {
//                     return {
//                         material: {...property}
//                     } 
//                 })
//             },
//             updateApparel_data : (key,value) => {
//                 set((state) =>
//                 {
//                    return {
//                     apparel_data: {
//                         ...state.apparel_data,
//                         [key]:value
//                        }
//                    }
//                 })
//             },
//             updateEditConfigId : (indexValue) => {
//                 set(() =>
//                 {
//                    return {
//                     editConfigId: indexValue
//                    }
//                 })
//             },
//             removeApparelPart_sticker : (activePart) => {
//                 set((state) =>
//                 {
//                     const filteredObj = {...state.apparel_data.activeApparelPart_data}
//                     delete filteredObj[activePart]

//                    return {
//                     apparel_data: {
//                         ...state.apparel_data,
//                         ['activeApparelPart_data']: {
//                             ...filteredObj
//                         }
//                        }
//                    }
//                 })
//             },
//             addConfiguration : (newConfig) => {
//                 set((state) =>
//                 {
//                     let configs = state.configurations
//                     configs.push(newConfig)
//                    return {
//                     configurations: configs
//                    }
//                 })
//             },
//             updateConfiguration : (index,newConfig) => {
//                 set((state) =>
//                 {
//                     let configs = state.configurations
//                     configs[index] = newConfig
//                    return {
//                     configurations: configs
//                    }
//                 })
//             },
//             updateControls : (controls) => {
//                 set(() =>
//                 {
//                    return {
//                     controls:controls
//                    }
//                 })
//             },
//             deleteConfiguration : (indexValue) => {
//                 set((state) =>
//                 {   
//                     let filteredConfigs = state.configurations.filter((_,index) => index !== indexValue)
//                    return {
//                     configurations: filteredConfigs
//                    }
//                 })
//             },
//             reset: () => {
//                 set((state) => {
//                     return {
//                         ...initialState,
//                         downloadFnc: state.downloadFnc,
//                         configurations: state.configurations,
//                     }
//                 })
//             },
//         }
//     }
// ))




import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

const initialState = {
  current_About_Scene: 'ocean',
  current_About_Content: null,
};

export default create(
  subscribeWithSelector((set) => {
    return {
      ...initialState,
      isLoading: true,
      dbData: {
        projectData: null,
        ideaData: null,
        aboutData: null,
      },
      visibleItem: null,
      isControlsEnabled: true,
      active_About_Content: null,
      camera: null,
      about_display_mode: false,
      setIsLoading: (isLoading) => set({ isLoading }),
      updateDataFromDB : (key,value) => {
        set((state) =>
        {
           return {
            dbData: {
                ...state.dbData,
                [key]:value
               }
           }
        })
      },
      updatCurrentAboutScene: (scene) => {
        // set((state) => ({ ...state, activeType: type }));
        set(() => {
            return {
                current_About_Scene: scene
            }
        });
      },
      updatCurrentAboutContent: (content) => {
        set(() => {
          return {
            current_About_Content: content,
          };
        });
      },
      updatActiveAboutContent: (content) => {
        set(() => {
          return {
            active_About_Content: content,
          };
        });
      },
      updatAboutDisplayMode: () => {
        set((state) => {
          return {
            about_display_mode: !state.about_display_mode
          }
        });
      },
      updateControls: (value) => {
        set(() => {
          return {
            isControlsEnabled: value
          }
        });
      },
      updateCamera: (camera) => {
        set(() => {
          return {
            camera
          }
        });
      },
      updateVisibleItem: (newItem) => {
        set(() => {
          return {
            visibleItem:newItem
          }
        });
      },
    };
  }),
);
