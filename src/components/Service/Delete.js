import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import { useDispatch, useSelector } from "react-redux";
import { deleteService } from '../../store/actions/index';

const Delete = ({id}) => {
    const serviceState = useSelector(state => state.service);
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => setOpen(true);
    const handleClose     = () => setOpen(false);
    const handleDelete    = () => dispatch(deleteService(localStorage.getItem('token'),{ id: id}));

    if( serviceState.isDeleted === true )
        return <Redirect to={'/mi-cuenta'} />;

    return (
        <div>
          <div className="small-title--center">
            <div className="button button--delete" onClick={handleClickOpen}>
                ELIMINAR SERVICIO
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <p style={{color: '#fff'}}>
                        Confirma que desea eliminar este servicio? Esta acción no se puede revertir
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
