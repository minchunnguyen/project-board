import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footerText: {
      textAlign: "right",
      padding: 12,
      background: theme.palette.background.default,
      fontSize: 12,
    },
  })
);

const Pagination = () => {
  const classes = useStyles();

  return (
    <footer>
      <div className={classes.footerText}>
        <span>Capgemini©️ Learning Project | </span>
        <span>
          Made with 💪 by <b>React Team</b>
        </span>
      </div>
    </footer>
  );
};

export default Pagination;
