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
                    <h3>Mapa interactivo</h3>
                    <p>Encontrá la máquina que estás buscando</p>
                </div>
                <div>
                  <div className="icon">
                    <img src="https://agrowp.estudioloop.com/wp-content/uploads/2021/04/prod02.svg" alt="icon"/>
                  </div>
                  <h3>Especificaciones técnicas</h3>
                  <p>La aplicación te dará todos los detalles de la máquina que te interesa</p>
                </div>
                <div>
                  <div className="icon">
                    <img src="https://agrowp.estudioloop.com/wp-content/uploads/2021/04/prod03.svg" alt="icon"/>
                  </div>
                    <h3>Contacto fácil y comodo</h3>
                    <p>Podés contactar con el contratista a cargo de la maquinaria elegida</p>
                </div>
            </Slider>
        </div>
      </div>
    );
};

export default Productor;
