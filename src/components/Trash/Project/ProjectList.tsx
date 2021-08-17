import React from "react";
import ProjectItem from "./ProjectItem";
import Project from "../../../interfaces/Project";
import { makeStyles } from "@material-ui/core/styles";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { FormattedMessage } from "react-intl";

const projectStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

type Props = {
  projects: Project[];
};

const ProjectList = (props: Props) => {
  const classes = projectStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell padding="checkbox">
              <Checkbox
                color="primary"
                inputProps={{ "aria-label": "select all" }}
              />
            </TableCell>
            <TableCell>
              <FormattedMessage id="project.table.id" defaultMessage="Id" />
            </TableCell>
            <TableCell>
              <FormattedMessage id="project.table.name" defaultMessage="Name" />
            </TableCell>
            <TableCell>
              <FormattedMessage
                id="project.table.manager"
                defaultMessage="Manager"
              />
            </TableCell>
            <TableCell>
              <FormattedMessage
                id="project.table.startdate"
                defaultMessage="Start Date"
              />
            </TableCell>
            <TableCell>
              <FormattedMessage
                id="project.table.enddate"
                defaultMessage="End Date"
              />
            </TableCell>
            <TableCell>
              <FormattedMessage
                id="project.table.status"
                defaultMessage="Status"
              />
            </TableCell>
            <TableCell>
              <FormattedMessage
                id="project.table.description"
                defaultMessage="Description"
              />
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.projects.map((project) => (
            <ProjectItem key={project.id} project={project} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProjectList;
