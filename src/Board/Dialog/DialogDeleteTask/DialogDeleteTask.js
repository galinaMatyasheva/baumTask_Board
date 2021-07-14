import React from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
  DialogTitle
} from "@material-ui/core";

class DialogDeleteTask extends React.Component {
  render() {
    return (
      <Dialog
        open={this.props.openConfirmationDeleteDialog}
        onClose={this.props.handleConfirmationDeleteTaskClose}
        className="dialog-delete"
      > 
      <DialogTitle>{"Are you sure to delete this task?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <DialogActions>
              <Button
                onClick={(e) => {
                  this.props.deleteTask(e);
                }}
              >
                Ok
              </Button>
              <Button
                autoFocus
                onClick={this.props.handleConfirmationDeleteTaskClose}
              >
                Cancel
              </Button>
            </DialogActions>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    );
  }
}

export default DialogDeleteTask;
