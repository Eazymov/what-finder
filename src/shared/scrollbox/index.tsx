/**
 * Types
 */
type ReactMouseEvent<T> = React.MouseEvent<T>;
type ReactNode = React.ReactNode;

interface Props {
  color?: string;
  className?: string;
}
/* *** */

import React, { Component } from 'react';

class ScrollBox extends Component<Props, {}> {
  public content: HTMLDivElement;
  public scrollbar: HTMLDivElement;
  public thumb: HTMLDivElement;
  public state = {
    shouldScroll: false,
  };

  componentDidMount() {
    const { thumb } = this;
    const { viewportHeight, contentHeight, ratio } = this;
    const thumbHeight = viewportHeight * ratio;

    if (viewportHeight < contentHeight) {
      thumb.style.height = `${thumbHeight}px`;
      this.setState({ shouldScroll: true });
    }
  }
  
  get viewportHeight() {
    return this.content.offsetHeight;
  }
  
  get contentHeight() {
    return this.content.scrollHeight;
  }
  
  get ratio() {
    return this.viewportHeight / this.contentHeight;
  }

  handleScroll = () => {
    const { content, thumb } = this;
    const { viewportHeight, contentHeight, ratio } = this;

    if (viewportHeight >= contentHeight) {
      this.setState({ shouldScroll: false });
      return;
    }

    const scrollTop = content.scrollTop;
    const thumbHeight = viewportHeight * ratio;
    const thumbTop = scrollTop * ratio;

    thumb.style.transform = `translateY(${thumbTop}px)`;
    thumb.style.height = `${thumbHeight}px`;
    this.setState({ shouldScroll: true });
  }

  scroll = (event: ReactMouseEvent<HTMLDivElement>) => {
    const { scrollbar, content, thumb, ratio } = this;
    const scrollbarRects = scrollbar.getBoundingClientRect();
    const scrollbarTop = scrollbarRects.top + window.pageYOffset;
    const thumbRects = thumb.getBoundingClientRect();
    const thumbTop = thumbRects.top + window.pageYOffset;
    const shiftY = event.pageY - thumbTop;
    const max = scrollbar.offsetHeight - thumb.offsetHeight;

    document.onmousemove = (mouseMoveEvent: MouseEvent) => {
      let top = mouseMoveEvent.pageY - shiftY - scrollbarTop;

      top = (top < 0) ? 0 : (top > max ? max : top);
      
      content.scrollTop = top / ratio;
    };
    
    document.onmouseup = () => {
      document.onmousemove = document.onmouseup = () => false;
    };
  }

  render() {
    const { props, state } = this;
    const { shouldScroll } = state;
    const color: string = props.color || '#000';
    const className: string | undefined = props.className;
    const children: ReactNode = props.children;

    return (
      <div className={`scrollbox ${className}`}>
        <div
          onScroll={this.handleScroll}
          ref={div => div && (this.content = div)}
          className="content"
        >{children}
        </div>
        <div
          className="scrollbar"
          style={{ display: shouldScroll ? 'block' : 'none' }}
          ref={div => div && (this.scrollbar = div)}
        >
          <div
            className="thumb"
            ref={div => div && (this.thumb = div)}
            style={{backgroundColor: color}}
            onMouseDown={this.scroll}
          />
        </div>
      </div>
    );
  }
}

export default ScrollBox;
