import React,{ useEffect, useState } from "react";
import { Link, Redirect } from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux";
import { setCurrentNavigation, fetchMachine, fetchMachineTypes, clearFetchMachine } from '../../../store/actions/index';
import { setTipoPadre, setTipos, addCaracteristica, removeCaracteristica } from '../../../store/actions/index';
import { updateMachine, createMachine, removeCalendarDate } from '../../../store/actions/index';
import { useForm } from "react-hook-form";

import Grid from "@material-ui/core/Grid";
import Switch from '@material-ui/core/Switch';

import GooglePlacesAutocomplete, { geocodeByPlaceId, getLatLng } from 'react-google-places-autocomplete';

import Aux from '../../../hoc/Auxiliar/Auxiliar';
import SectionTitle from '../../../components/UI/Title/Primary';
import SmallTitle from '../../../components/UI/Title/Small';
import { IconPlus, IconAccount } from '../../../components/UI/Icon/Icon';
import Listing from '../../../components/Listing/Listing';
import BackgroundImage from '../../../components/UI/Background/Image';
import Spinner from '../../../components/UI/Spinner/Spinner';
import DeleteMachine from '../../../components/Machine/Delete';
import CalendarAdd from '../../../components/Machine/Calendar/Add';

const FormMachine = (props) => {
    const { register, handleSubmit, errors } = useForm();
    const [isEnabled, setEnabled] = useState(true);
    const [image, setImage] = useState(null);
    const [locationAddress, setLocationAddress] = useState('');
    const [location, setLocation] = useState(null);
    const [placeId, setPlaceId] = useState(null);
    const [caracteristicaText, setCaracteristicaText] = useState('');
    const [isDateFormOpen, setDateFormOpen] = useState(false);

    const formState = useSelector(state => state.machine);
    const dispatch  = useDispatch();

    const onPlaceSelect = (place) => {
        setLocationAddress(place.label);
        setPlaceId(place.value.place_id);
        geocodeByPlaceId(place.value.place_id)
            .then(results => getLatLng(results[0]))
            .then(({ lat, lng }) => {
                setLocation({ lat, lng });
            });
    };

    const onFileUpload = (event) => {
        event.preventDefault();

        let file_reader = new FileReader();
        let file = event.target.files[0];
        file_reader.onload = () => setImage(file_reader.result);
        file_reader.readAsDataURL(file);
    };

    const handleAddCaracteristica = () => {
        if( caracteristicaText !== '' ){
            dispatch( addCaracteristica({'descripcion': caracteristicaText}) );
            setCaracteristicaText('');
        }
    };

    const handleDeleteCalendario = (key) => dispatch( removeCalendarDate(key) );
    const handleDeleteCaracteristica = (key) => dispatch( removeCaracteristica(key) );
    const handleTipoSelected = (id) => dispatch( setTipos(id) );
    const handlePadreSelected = (id) => {
        id = ( formState.selectedTipoPadre === id ) ? null:id;
        dispatch( setTipoPadre(id) );
    };

    const onSubmit = ( data, event ) => {
        event.preventDefault();

        data.userId= localStorage.getItem('userId');
        data.image = image;
        data.fechas= formState.fechas;
        data.caracteristicas = formState.caracteristicas;
        data.parentSelected  = formState.selectedTipoPadre;
        data.childsSelected  = formState.selectedTipos;
        data.address         = locationAddress;
        data.location        = location;
        data.placeId         = placeId;
        data.estado          = isEnabled;

        if( props.match ){
            data.id =   props.match.params.maquinaId;
            dispatch(updateMachine( localStorage.getItem('token'), data ));
        }else{
            dispatch(createMachine( localStorage.getItem('token'), data ));
        }
    };

    useEffect( () => {
        dispatch( clearFetchMachine() );

        if( props.match ){
            dispatch( setCurrentNavigation('edit-machine') );

            //  fetch machine data
            dispatch( fetchMachine( { id: props.match.params.maquinaId} ) );

            formState.machine && setEnabled(formState.machine.estado);
        }else{
            dispatch( setCurrentNavigation('new-machine') );
        }

        dispatch( fetchMachineTypes() );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
        
    if( formState.error !== null )
        return <Redirect to="/mi-cuenta/" />;

    return (
        <Aux>
            <section className={`machine-data${formState.success ? ' background-overlay':''}`}>
                <div className="machine-data-cont">
                    <div className="container">
                        <SectionTitle text="MAQUINARIA" />
                    </div>

                    {formState.loading ?
                    <Spinner />:
                    <div>
                        {formState.machine && <DeleteMachine id={formState.machine.id} />}

                        {formState.error && <div className="error-msg">{formState.error.message}</div>}
                        {formState.success &&
                        <div className="contact-popup">
                            <div className="row">
                                <div className="row">
                                    <p className="success">{formState.success}</p>
                                </div>
                                <div className="row">
                                    <div className="buttons-cont">
                                        <Link to={'/mi-cuenta'} className="button button--line account-btn">
                                            <IconAccount />
                                            <span>Mi Cuenta</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>}
                        <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                        {formState.tipos &&
                            <div>
                                <div className="small-title--center">
                                  <SmallTitle text="Tipo de Maquinaria" />
                                </div>
                                <div className="machines__list">
                                    <Listing
                                        type="machine-type"
                                        items={formState.tipos}
                                        parentSelected={formState.selectedTipoPadre}
                                        childsSelected={formState.selectedTipos}
                                        parentClick={handlePadreSelected}
                                        childClick={handleTipoSelected} />
                                </div>
                            </div>}

                        <div className="machine-data__box">
                            <div className="machine-data__model">
                                <label htmlFor="modelo">Modelo</label>
                                <input
                                    id="modelo"
                                    name="modelo"
                                    type="text"
                                    autoComplete="off"
                                    className="form-control"
                                    aria-describedby="Ingrese el modelo"
                                    defaultValue={formState.machine?.modelo}
                                    placeholder="Modelo"
                                    ref={register({
                                            required: {
                                                value: true,
                                                message: "Por favor ingrese modelo",
                                            },
                                            minLength: {
                                                value: 3,
                                                message: "Mínimo 3 caracteres",
                                            },
                                            maxLength: {
                                                value: 255,
                                                message: "Máximo permitido de 255 caracteres",
                                            },
                                        })}
                                />
                                {errors.modelo && (
                                    <span className="error mandatory">
                                        {errors.modelo.message}
                                    </span>
                                )}
                            </div>

                            <div className="machine-data__year">
                                <label htmlFor="year">Año</label>
                                <input
                                    id="year"
                                    name="year"
                                    type="number"
                                    autoComplete="off"
                                    className="form-control"
                                    aria-describedby="Ingrese el año"
                                    max={(new Date().getFullYear())}
                                    defaultValue={formState.machine?.year}
                                    placeholder="Año"
                                    ref={register({
                                            required: {
                                                value: true,
                                                message: "Por favor ingrese el año",
                                            },
                                            validate: {
                                                yearValid: value => {
                                                    return (value.length === 4) && (parseInt(value) > 1950 && parseInt(value) <= new Date().getFullYear());
                                                }
                                            }
                                        })}
                                />
                                {errors.year && (
                                    <span className="error mandatory">
                                        {errors.year.type === "yearValid" ? 'Por favor ingrese un año válido':errors.year.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="machine-data__box">
                            <label htmlFor="imagen">Foto</label>
                            <div className="upload-btn-wrapper">
                                <button className="btn-upload button" title="Haga clic para seleccionar el archivo">Seleccionar foto</button>
                                <input
                                    type="file"
                                    id="imagen"
                                    name="imagen"
                                    accept=".jpg,.gif,.jpeg,.png"
                                    onChange={onFileUpload}
                                />
                                {image && ( <div className="user__image">
                                            <BackgroundImage path={image} alt="Imágen seleccionada" />
                                        </div>)}
                                {(formState.machine && formState.machine.imagen && !image) &&
                                <div className="user__image">
                                    <BackgroundImage path={formState.machine.imagen} alt="Imágen seleccionada" />
                                </div>}
                            </div>
                        </div>

                        <div className="machine-data__box">
                            <label htmlFor="ubicacion">Ubicación actual</label>
                            {(formState.machine && formState.machine.ubicacion) &&
                            <div className="ubicacion--actual">
                                {formState.machine.ubicacion.address}
                            </div>}

                            <div className="ubicacion--actual">
                                Ingrese su ubicación actualizada
                                <GooglePlacesAutocomplete
                                    apiOptions={{ language: 'es', region: 'es' }}
                                    // eslint-disable-next-line no-undef
                                    apiKey={firebase.config().googlemaps.key}
                                    selectProps={{location, onChange: onPlaceSelect, loadingMessage: () => { return 'Buscando...'; }, placeholder: 'Ubicación…', noOptionsMessage: () => { return 'Escriba su ubicación...'}}}
                                    autocompletionRequest={{types: ['(cities)'], componentRestrictions: {country: ['ar']}}} />
                            </div>
                        </div>

                        <div className="machine-data__box">
                            {formState.machine &&
                            <label htmlFor="estado">
                                Estado Actual: 
                                {formState.machine.estado ? 'Disponible':'No disponible'}
                            </label>}
                                
                            <Grid component="label" container alignItems="center" spacing={1}>
                                <Grid item>No Disponible</Grid>
                                <Grid item>
                                    <Switch
                                        className="machine_status"
                                        checked={isEnabled}
                                        onChange={() => setEnabled(!isEnabled)}
                                    />
                                </Grid>
                                <Grid item>Disponible</Grid>
                            </Grid>
                        </div>

                        <div className="machine-data__box">
                            <SmallTitle text="Caracteristicas" />

                            <div className="machine-data__add-feature">
                                <input
                                    id="caracteristicas"
                                    name="caracteristicas"
                                    type="text"
                                    autoComplete="off"
                                    className="form-control"
                                    aria-describedby="Agregar Caracteristica"
                                    placeholder="Agregar Caracteristica"
                                    value={caracteristicaText}
                                    onChange={(e) => setCaracteristicaText(e.target.value)}
                                />
                                <div className="add-feature" onClick={handleAddCaracteristica}>
                                    <IconPlus />
                                </div>

                                {formState.caracteristicas.length > 0 &&
                                <div className="single-machine__features">
                                    <Listing
                                        type="feature"
                                        action="edit"
                                        items={formState.caracteristicas}
                                        handleDelete={handleDeleteCaracteristica}
                                    />
                                </div>}
                            </div>
                        </div>
                        
                        {formState.machine && 
                        <div className="machine-data__box">
                            <SmallTitle text="Calendario de Maquina" />

                            <div className="calendar-cont">
                                <div className="calendar-cont__add" onClick={() => setDateFormOpen(!isDateFormOpen)}>
                                    <SmallTitle text="+ Agregar nueva fecha" />
                                </div>

                                {isDateFormOpen && <CalendarAdd id={formState.machine.id} />}
                                    
                                {(formState.fechas && formState.fechas.length) ?
                                <div className="calendar-cont__list">
                                    <Listing
                                        type="calendar"
                                        action="edit"
                                        items={formState.fechas}
                                        handleDelete={handleDeleteCalendario}
                                    />
                                </div>:''}
                            </div>
                        </div>}
                            
                        {(formState.selectedTipoPadre > 0 && (location !== null || (formState.machine && formState.machine.ubicacion))) &&
                        <div className="machine-data__box">
                            <button type="submit" className="button button--full btn-outline-primary">
                                Guardar
                            </button>
                        </div>}

                        </form>
                    </div>}
                </div>
            </section>
        </Aux>
    );
}

export default FormMachine;