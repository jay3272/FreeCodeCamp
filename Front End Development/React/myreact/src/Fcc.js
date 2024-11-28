import React from 'react';
import PropTypes from 'prop-types';

class CampSite extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Camper name={this.props.name}/>
      </div>
    );
  }
};

const Camper = props => <p>{props.name}</p>;

Camper.defaultProps = {
  name: "CamperBot"
};

Camper.propTypes = {
  name: PropTypes.string.isRequired
};

function Fcc() {
  return (
    <div>
      <CampSite />
    </div>
  );
}

export default Fcc;
