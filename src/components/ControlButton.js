import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    padding: 6,
    minWidth: 0,
  },
});

function ControlButton({ children, className, ...other }) {
  const classes = useStyles();
  return (
    <Button
      {...other}
      className={`${classes.root}${className ? ` ${className}` : ""}`}
    >
      {children}
    </Button>
  );
}

export default ControlButton;
