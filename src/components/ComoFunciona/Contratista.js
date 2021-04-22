import React from 'react';
import Slider from "react-slick";

const Contratista = () => {
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
      <div className="funciona-item">
        <h2> SI SOS CONTRATISTA </h2>
        <div className="slider-container">
            <Slider {...settings}>
            <div>
                <div className="icon">
                  <img src="https://agrowp.estudioloop.com/wp-content/uploads/2021/04/con01.svg" alt="icon"/>
                </div>
                <h3>cargar el detalle y especificaciones técnicas</h3>
                <p>de cada una de las maquinarias dispuestas para la contratación</p>
            </div>
            <div>
              <div className="icon">
                <img src="https://agrowp.estudioloop.com/wp-content/uploads/2021/04/con02.svg" alt="icon"/>
              </div>
              <h3>Habilitar/Deshabilitar</h3>
              <p>Podés ir actualizando la disponibilidad o no de cada uno de tus productos</p>
            </div>
            <div>
              <div className="icon">
                <img src="https://agrowp.estudioloop.com/wp-content/uploads/2021/04/con03.svg" alt="icon"/>
              </div>
                <h3>geolocalización</h3>
                <p>la app te permite ir modificando la geolocalización de las maquinarias en el mapa interactivo</p>
            </div>
            </Slider>
        </div>
      </div>
    );
};

export default Contratista;
