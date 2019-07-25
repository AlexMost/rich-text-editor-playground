import React from 'react';
import { Editor, EditorState, CompositeDecorator } from 'draft-js';
import { findWithRegex } from './utils';

const EXPRESSION_REGEX = /\$\{.*?\}/g;

function expressionStrategy(contentBlock, callback, contentState) {
  findWithRegex(EXPRESSION_REGEX, contentBlock, callback)
}

const expressionStyle = {
  backgroundColor: 'yellow',
  fontWeight: 'bold',
}

const ExpressionSpan = (props) => {
  return (
    <span
      style={expressionStyle}
      data-offset-key={props.offsetKey}
    >
      {props.children}
    </span>
  );
};


export class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    const compositeDecorator = new CompositeDecorator([
      {
        strategy: expressionStrategy,
        component: ExpressionSpan,
      }
    ])

    this.state = {
      editorState: EditorState.createEmpty(compositeDecorator)
    };
    this.onChange = (editorState) => this.setState({editorState});
  }
  render() {
    return (
      <div className="Editor">
        <Editor editorState={this.state.editorState} onChange={this.onChange} />
      </div>
    );
  }
}
