import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import { useDispatch, useSelector } from "react-redux";
import { deleteMachine } from '../../store/actions/index';

const Delete = ({id}) => {
    const machineState = useSelector(state => state.machine);
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => setOpen(true);
    const handleClose     = () => setOpen(false);
    const handleDelete    = () => dispatch(deleteMachine(localStorage.getItem('token'),{ id: id}));

    if( machineState.isDeleted === true )
        return <Redirect to={'/mi-cuenta'} />;

    return (
        <div>
          <div className="small-title--center">
            <div className="button button--delete" onClick={handleClickOpen}>
                ELIMINAR MAQUINARIA
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <p style={{color: '#fff'}}>
                        Confirma que desea eliminar esta maquinaria? Esta acción no se puede revertir
                    </p>
                </DialogContent>
                <DialogActions>
                    <div className="button small-button" onClick={handleClose}>
                        Cancelar
                    </div>
                    <div className="button small-button" onClick={handleDelete} autoFocus>
                        Aceptar
                    </div>
                </DialogActions>
            </Dialog>
          </div>
        </div>
    );
};

export default Delete;
