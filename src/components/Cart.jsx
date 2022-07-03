import React from 'react';
import Context from '../Layouts/Layout';
import Attributes from '../widgets/Attributes';
import Carousel from '../widgets/Carousel';
import QuantityChanger from '../widgets/QuantityChanger';
import styled from 'styled-components';

const Cart = styled.section`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 16px 0;

  &:first-child::before {
    content: '';
    position: absolute;
    top: 0;
    width: 100%;
    height: 1px;
    background-color: #E5E5E5;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 1px;
    background-color: #E5E5E5;
  }
`;

const Title = styled.h2`
  font-size: 30px;
  font-weight: ${props => props.weight || 400};
  line-height: 40px;
`;

const Price = styled.span`
  display: block;
  margin: 16px 0 0 0;
  font-size: 24px;
  font-weight: 700;
`;

export default class Item extends React.Component {
  static contextType = Context;

  removeQuantity = () => {
    if (this.props.quantity <= 1) {
      this.context.items.splice(this.props.index, 1);
    } else {
      this.context.updateItem(this.props.index, -1, this.props.attribute);
    }

    this.context.updateBag(-1, this.props.price);
  }

  addQuantity = () => {
    this.context.updateItem(this.props.index, 1, this.props.attribute);
    this.context.updateBag(1, this.props.price);
  }

  handleAttribute = (type, id, value) => {
    let attribute = this.props.attribute;
    const newAttribute = {
      "id": type,
      "items": {
        "id": id,
        "value": value
      }
    };
    const attributeIndex = attribute.findIndex(object => {
      return object.id === type;
    });

    attribute[attributeIndex] = newAttribute;

    this.context.updateItem(this.props.index, 0, attribute);
  }

  render() {
    return (
      <Cart>
        <div style={{width: '300px'}}>
          <Title weight={700}>{this.props.brand}</Title>
          <Title>{this.props.name}</Title>
          <Price>{this.props.currency + this.props.price}</Price>
          <Attributes attributes={this.props.attributes} attribute={this.props.attribute} handleAttribute={this.handleAttribute} height={45} margin={24} />
        </div>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <QuantityChanger quantity={this.props.quantity} removeQuantity={this.removeQuantity} addQuantity={this.addQuantity} height={288} size={45} fontSize={32} />
          <Carousel images={this.props.images} />
        </div>
      </Cart>
    )
  }
}
