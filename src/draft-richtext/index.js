import { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Editor, EditorState, RichUtils, convertToRaw } from "draft-js";
import InlineWrapper from "./InlineWrapper";

import "draft-js/dist/Draft.css";

const useStyles = makeStyles(() => ({
  editorControl: {
    marginBottom: 10,
  },
}));

function DraftRichText() {
  const classes = useStyles();
  const editor = useRef();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const [inlineStyles, setInlineStyles] = useState([]);

  const onChange = (newEditorState) => {
    const fixedEditorState = EditorState.setInlineStyleOverride(
      newEditorState,
      inlineStyles
    );
    setEditorState(fixedEditorState);
  };

  const _toggleInlineStyle = (style) => {
    const arrTemp = [];
    let isAdd = true;
    inlineStyles.forEach((temp) => {
      if (temp !== style) {
        arrTemp.push(temp);
      } else {
        isAdd = false;
      }
    });
    if (isAdd) {
      arrTemp.push(style);
    }
    setInlineStyles(arrTemp);
  };

  const handleKeyCommand = (command, currEditorState) => {
    console.log(command)
    if(command === 'bold') {
      _toggleInlineStyle('BOLD')
      return "not-handled"
    };
    if(command === 'italic') {
      _toggleInlineStyle('ITALIC')
      return "not-handled"
    };
    if(command === 'underline') {
      _toggleInlineStyle('UNDERLINE')
      return "not-handled"
    };
    const newState = RichUtils.handleKeyCommand(currEditorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const focus = () => {
    editor.current.focus();
  };

  const setRef = (ref) => {
    editor.current = ref;
  };
  return (
    <div>
      <Paper variant="outlined" className={classes.editorControl}>
        <InlineWrapper
          editorState={editorState}
          inlineStyles={inlineStyles}
          toggleInlineStyle={_toggleInlineStyle}
        />
      </Paper>
      <div onClick={focus}>
        <Editor
          ref={setRef}
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

export default DraftRichText;
