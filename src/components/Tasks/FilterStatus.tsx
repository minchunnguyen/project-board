import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useDispatch } from "react-redux";
import { filterTasksByStatus } from "./../../redux/Tasks/actions";

const useStyles = makeStyles((theme) => ({
  button: {
    display: "block",
    marginTop: theme.spacing(2),
  },
  formControl: {
    minWidth: 110,
    marginLeft: 8,
    position: "absolute",
    top: 45,
    right: 300,
  },
  menu: {
    fontSize: 14,
    color: "white",
  },
  label: {
    position: "absolute",
    fontSize: 15,
    width: 135,
    right: 140,
    top: 5,
    color: "white",
  },
}));

export default function FilterStatus() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [status, setStatus] = React.useState("non");

  const handleChange = (event: any) => {
    setStatus(event.target.value);
    dispatch(filterTasksByStatus(event.target.value));
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <div className={classes.label}>Filter By Status: </div>
        <NativeSelect
          className={classes.menu}
          value={status}
          onChange={handleChange}
          inputProps={{
            name: "status",
            id: "age-native-label-placeholder",
          }}
        >
          <option value={"non"}>NON SELECTED</option>
          <option value={"open"}>OPEN</option>
          <option value={"in-progress"}>IN_PROGRESS</option>
          <option value={"finished"}>FINISHED</option>
          <option value={"re-opened"}>RE_OPENED</option>
          <option value={"closed"}>CLOSED</option>
        </NativeSelect>
      </FormControl>
    </div>
  );
}
