import { useMemo, useState } from "react";
import { EditorState, RichUtils } from "draft-js";
import ControlButton from "components/ControlButton";
import FormatBoldIcon from "@material-ui/icons/FormatBold";
import FormatItalicIcon from "@material-ui/icons/FormatItalic";
import FormatUnderlinedIcon from "@material-ui/icons/FormatUnderlined";

var INLINE_STYLES = [
  { Icon: FormatBoldIcon, style: "BOLD" },
  { Icon: FormatItalicIcon, style: "ITALIC" },
  { Icon: FormatUnderlinedIcon, style: "UNDERLINE" },
];

function InlineWrapper({ editorState, inlineStyles, toggleInlineStyle }) {
  const isActive = style => {
    // const currentStyle = editorState.getCurrentInlineStyle();
    const active = Boolean(inlineStyles.find(element => element === style));
    return active;
  };
  
  return (
    <div>
      {INLINE_STYLES.map((inStyle, index) => (
        <ControlButton
          key={index}
          onClick={(e) => toggleInlineStyle(inStyle.style)}
          color={isActive(inStyle.style) ? "primary" : "default"}
        >
          <inStyle.Icon />
        </ControlButton>
      ))}
    </div>
  );
}

export default InlineWrapper;
