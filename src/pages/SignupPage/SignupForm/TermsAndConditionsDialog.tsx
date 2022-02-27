import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import TERMS_AND_CONDITIONS_TEXT from 'constants/termsAndConditions';
import styles from './TermsAndConditionsDialog.module.scss';

interface TermsAndConditionsDialogProps {
  text: string;
}

const TermsAndConditionsDialog: React.FC<TermsAndConditionsDialogProps> = (props) => {
  const [open, setOpen] = React.useState(false);
  const { text } = props;

  const termsAndConditionsDialogHandler = () => {
    setOpen(false);
  };

  return (
    <Box className={styles.container}>
      <Button
        onClick={() => {
          setOpen(true);
        }}
        className={styles.text}
      >
        {text}
      </Button>
      <Dialog
        open={open}
        onClose={termsAndConditionsDialogHandler}
        aria-labelledby="title"
        aria-describedby="description"
      >
        <DialogTitle id="title">{text}</DialogTitle>
        <DialogContent>
          <DialogContentText
            id="description"
            tabIndex={-1}
          >
            {[...new Array(50)]
              .map(
                () => (TERMS_AND_CONDITIONS_TEXT),
              )
              .join('\n')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={termsAndConditionsDialogHandler}>OK</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TermsAndConditionsDialog;
