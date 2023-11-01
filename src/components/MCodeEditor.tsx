import React, { useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import { useAuth } from "../contexts/AuthContext";
import ACTIONS from "../utils/Actions";

const MCodeEditor = (props: any) => {
  const { socketRef, roomId, socketId } = props;
  const auth = useAuth();

  const [value, setValue] = React.useState(`
    function add(a, b) {
      return a + b;
    }
  `);

  const options = {
    autoIndent: "full",
    contextmenu: true,
    fontFamily: "monospace",
    fontSize: 13,
    lineHeight: 24,
    hideCursorInOverviewRuler: true,
    matchBrackets: "always",
    minimap: {
      enabled: true,
    },
    scrollbar: {
      horizontalSliderSize: 4,
      verticalSliderSize: 18,
    },
    selectOnLineNumbers: true,
    roundedSelection: false,
    readOnly: false,
    cursorStyle: "line",
    automaticLayout: true,
  };

  const onCodeChange = (value: any, event: any) => {
    auth.handleChangeCode(value);

    socketRef.current.emit(ACTIONS.CODE_CHANGE, {
      roomId: roomId,
      code: value,
    });

    socketRef.current.emit(ACTIONS.SYNC_CODE, {
      socketId: socketId,
      code: value,
    });
  };

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(
        ACTIONS.CODE_CHANGE,
        ({ code }: { code: string | null }) => {
          if (code !== null) {
            // You can handle the received code here
            //   console.log("Received code:", code);
            auth.handleChangeCode(code);
          }
        }
      );
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.off(ACTIONS.CODE_CHANGE);
      }
    };
  }, [socketRef]);

  return (
    <Editor
      height="50vh"
      language={auth.selectedLanguage}
      value={auth.code}
      theme={auth.selectedTheme}
      //  options={options}
      onChange={(value, event) => {
        onCodeChange(value, event);
      }}
    />
  );
};

export default MCodeEditor;
