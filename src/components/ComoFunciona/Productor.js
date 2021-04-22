import React from 'react';
import Slider from "react-slick";

const Productor = () => {
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
      <div className="funciona-item">
        <h2> SI SOS PRODUCTOR </h2>
        <div className="slider-container">
            <Slider {...settings}>
                <div>
                    <div className="icon">
                      <img src="https://agrowp.estudioloop.com/wp-content/uploads/2021/04/prod01.svg" alt="icon"/>
                    </div>
                    <h3>mapa interactivo</h3>
                    <p>Encontra la maquina que estas buscando</p>
                </div>
                <div>
                  <div className="icon">
                    <img src="https://agrowp.estudioloop.com/wp-content/uploads/2021/04/prod02.svg" alt="icon"/>
                  </div>
                  <h3>especificaciones técnicas</h3>
                  <p>la aplicación te dara todos los detalles de la maquina que te interesa</p>
                </div>
                <div>
                  <div className="icon">
                    <img src="https://agrowp.estudioloop.com/wp-content/uploads/2021/04/prod03.svg" alt="icon"/>
                  </div>
                    <h3>contacto fácil y comodo</h3>
                    <p>Podés contactar con  el contratista a cargo de la maquinaria elegida</p>
                </div>
            </Slider>
        </div>
      </div>
    );
};

export default Productor;
