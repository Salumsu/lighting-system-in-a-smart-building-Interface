import { useState } from "react";
import { createContext } from "react";

import "./PopUp.css";
export const PopUpData = createContext();

/*
  MUST: put the Provider outside any elements width 
        position of relative or absolute so it will base
        the container's height and with to the whole 
        page

  <el
    onClick={() => {
      confirm.init("title", "body", [
        confirm.createButton({
              text: "OK",
              f: { call: console.log, args: ["ok"] },
              type: "confirm",
            }),
            confirm.createButton({
              text: "Cancel",
              f: { call: console.log, args: ["nah"] },
              type: "cancel",
            }),
            confirm.createButton({
              text: "Please Dont",
              f: { call: console.log, args: ["ops"] },
              type: "warning",
            }),
          ]);
        }}
    >
    click meh
  </el>
*/

function PopUpDataProvider({ children }) {
  const [visible, setVisible] = useState(false);
  const [popUpState, setPopUpState] = useState({
    title: "",
    body: "",
    buttons: [],
    classList: [],
    element: null,
    idList: [],
    closeable: true,
  });

  // helper for passing buttons args
  /*
    type will be for default styling
    confirm
    cancel
    warning
  */
  const createButton = ({
    text = "",
    f = { call: null, args: [] },
    classList = [],
    type = "",
  }) => {
    return { text, f, classList, type };
  };

  /*
    title: will be put on a h1 and placed on the topmost part of the popup
      expects > the summary of the confirmation or the title

    body: will be place put on a p tag and be placed on the middle part of the popup
      expects > a brief explanation about the popup

    buttons: will be placed on button tags and be placed on the bottom most part of the popup
      expects > an array of button data
  */

  const init = ({
    title = "Confirmation",
    body = "Are you sure?",
    buttons = [
      createButton({
        text: "OK",
        f: {
          call: console.log,
          args: ["You forgot to put your custom button!"],
        },
        type: "confirm",
      }),
    ],
    element = null,
    classList = [],
    idList = [],
    closeable = true,
  }) => {
    let temp = popUpState;
    temp.classList = classList;
    temp.idList = idList;
    temp.closeable = closeable;
    if (element) {
      temp.element = element;
    } else {
      temp.title = title;
      temp.body = body;
      temp.buttons = buttons;
    }
    setPopUpState(temp);
    setVisible(true);
  };

  const reset = () => {
    setPopUpState({
      title: "",
      body: "",
      buttons: [],
      element: null,
    });
    setVisible(false);
  };

  const data = { createButton, init };
  return (
    <PopUpData.Provider value={data}>
      {visible ? <PopUp popUpState={popUpState} reset={reset} /> : <></>}
      {children}
    </PopUpData.Provider>
  );
}

const PopUp = ({ popUpState, reset }) => {
  const { title, body, buttons, element, classList, idList, closeable } =
    popUpState;
  return (
    <div className={`pop-up-container ${classList.join(" ")}`}>
      {element ? (
        <div className="container">
          {closeable && (
            <div className="pop-up-close flex-center" onClick={reset}>
              X
            </div>
          )}
          {element}
        </div>
      ) : (
        <div className="pop-up" id={`${idList.join(" ")}`}>
          {closeable && (
            <div className="pop-up-close flex-center" onClick={reset}>
              X
            </div>
          )}
          <div className="pop-up-header">
            <h1>{title}</h1>
          </div>
          <div className="pop-up-body">
            <p>{body}</p>
          </div>
          <div className="pop-up-buttons">
            {buttons.map((button) => {
              return (
                <button
                  key={button.text}
                  className={`${button.classList.join(" ")} ${button.type}`}
                  onClick={() => {
                    if (button.f.call) {
                      if (button.f.args) {
                        button.f.call(...button.f.args);
                      } else {
                        button.f.call();
                      }
                    }
                    reset();
                  }}
                >
                  {button.text}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default PopUpDataProvider;
