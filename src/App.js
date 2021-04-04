import { useState, useRef } from "react";
import "./App.css";
import { Editor, EditorState, RichUtils } from "draft-js";
import DraftRichText from './draft-richtext';
import "draft-js/dist/Draft.css";

function App() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const editor = useRef(null);

  const _onBoldClick  = (e) => {
    const editorStateFocused = EditorState.forceSelection(
      editorState,
      editorState.getSelection(),
    );

    setEditorState(RichUtils.toggleInlineStyle(editorStateFocused, 'BOLD'));
  };

  const focusEditor = () => {
    // editor.current.focus();
  }

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      setEditorState(newState);
      return "handled";
    }

    return "not-handled";
  };

  console.log(editor.current);
  return (
    <div className="App">
      <div className="App-container">
      
        <div className="row">
        <DraftRichText />
        </div>
      </div>
    </div>
  );
}

export default App;
