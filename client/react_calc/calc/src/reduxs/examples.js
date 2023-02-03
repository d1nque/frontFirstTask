import React from "react";
import { connect } from "react-redux";
import { appendData } from "./action";

class Examples extends React.Component {
  componentDidMount() {
  	let arr = [];
  	this.props.appendData({
  		examples: [...this.props.examples, ...arr]
  	});
  }

  render() {
  	const { examples } = this.props;
    let examplesList = examples.length > 0
    	&& examples.map((item, i) => {
      return (
        <p id={"a"+i} key={i}>
        	{item}
        </p>
      )
    }, this);

	  return (
        <div className="history">
            { examplesList }
        </div>
	  );
	}
}

const mapDispatchToProps = {
	appendData
}

const mapStateToProps = state => ({
  examples: state.examples
});

export default connect(mapStateToProps, mapDispatchToProps)(Examples);