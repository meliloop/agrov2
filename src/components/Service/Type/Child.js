import React,{ useState } from 'react';

import Collapse from '@material-ui/core/Collapse';
import { IconPlus, IconMinus } from '../../UI/Icon/Icon';

const Child = (props) => {
    const [isOpen, setOpen] =   useState(false);
    const isChecked         =   props.childsSelected ? 
                                    Object.values(props.childsSelected).includes(props.data.id):
                                    false;
        
    const handleChecked = () => props.childClick(props.data.id);
        
    return (
        <div>
            <div className="machines__list__item">
                <div onClick={handleChecked} >
                    <span className={isChecked ? 'check checked':'check'}></span>
                    <span className="name">{props.data.title}</span>
                </div>

                {(props.data.childs.length > 0) &&
                <div className="open-submenu" onClick={() => setOpen(!isOpen)}>
                    <span className={isOpen ? "minus":"plus"}>
                        {isOpen ? <IconMinus />: <IconPlus />}
                    </span>
                </div>}
            </div>
            
            <Collapse in={isOpen}>
                <div className="machine__sublist">
                    {props.data.childs.map(cabezal =>   <Child 
                                                            key={cabezal.id} 
                                                            data={cabezal} 
                                                            childsSelected={props.childsSelected} 
                                                            childClick={props.childClick} 
                                                        />)}
                </div>
            </Collapse>
        </div>
    );
};

export default Child;
/*
export default class Child extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            isChecked : false,
            isOpen : false
        }

        this.handleCheck    =   this.handleCheck.bind(this)
        this.handleClick    =   this.handleClick.bind(this)
    }

    handleCheck(event){
        this.setState(prevState =>{
            return{
                isChecked : !prevState.isChecked
            }
        })
    }

    handleClick(event){
        this.setState(prevState =>{
            return{
                isOpen : !prevState.isOpen
            }
        });

        this.props.childClick();
    }

    render(){
        return (
            <div>
                <div className="machines__list__item">
                    <div onClick={this.handleCheck} >
                    <span className={this.state.isChecked ? 'check checked':'check'}></span>
                    <span className="name">{this.props.data.title}</span>
                    </div>

                    {(this.props.data.childs.length > 0) &&
                    <div className="open-submenu" onClick={this.handleClick}>
                        <span className={this.state.isOpen ? "minus":"plus"}>
                        {this.state.isOpen ? <IconMinus />: <IconPlus />}
                        </span>
                    </div>}
                </div>
                
                <Collapse in={this.state.isOpen}>
                    <div className="machine__sublist">
                        {this.props.data.childs.map(cabezal => <Child key={cabezal.id} data={cabezal} />)}
                    </div>
                </Collapse>
            </div>
        )
    }
}*/