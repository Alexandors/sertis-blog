import React from 'react';
import './style.css';

export default class NotFound extends React.PureComponent {

  getDisplayMessage = () => 'Page Not Found';

  render() {
    return (
      <div
        style={{
          width: '100%',
          left: 0,
          height: '97%',
          position: 'fixed',
        }}
        className="not-found"
      >
        <div className="snow"/>
        <h1
          style={{
            zIndex: 1,
            textAlign: 'center',
            width: '70%',
            paddingTop: '40px',
            margin: 'auto',
            color: 'white',
            animation: 'squigglevision 0.3s infinite',
          }}
        >
          {this.getDisplayMessage()}
        </h1>
        <div className="content content--husky" style={{ backgroundColor: '#4F8EDB', transform: 'scale(1.01, 1.01)' }}>
          <div className="mountain"/>
          <div className="mountain"/>
          <div className="husky">
            <div className="husky-mane">
              <div className="husky-coat">
                <div className="husky-name">AMSKY</div>
              </div>
            </div>
            <div className="husky-body">
              <div className="husky-head">
                <div className="husky-ear"/>
                <div className="husky-ear"/>
                <div className="husky-face">
                  <div className="husky-eye"/>
                  <div className="husky-eye"/>
                  <div className="husky-nose"/>
                  <div className="husky-mouth">
                    <div className="husky-lips"/>
                    <div className="husky-tongue"/>
                  </div>
                </div>
              </div>
              <div className="husky-torso"/>
            </div>
            <div className="husky-legs">
              <div className="husky-front-legs">
                <div className="husky-leg"/>
                <div className="husky-leg"/>
              </div>
              <div className="husky-hind-leg"></div>
            </div>
            <div className="husky-tail">
              <div className="husky-tail">
                <div className="husky-tail">
                  <div className="husky-tail">
                    <div className="husky-tail">
                      <div className="husky-tail">
                        <div className="husky-tail"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style={{ display: 'none' }}>
            <defs>
              <filter id="squiggly-0">
                <feTurbulence id="turbulence" baseFrequency="0.02" numOctaves="3" seed="0"/>
                <feDisplacementMap id="displacement" in="SourceGraphic" scale="2"/>
              </filter>
              <filter id="squiggly-1">
                <feTurbulence id="turbulence" baseFrequency="0.02" numOctaves="3" seed="1"/>
                <feDisplacementMap in="SourceGraphic" scale="3"/>
              </filter>
              <filter id="squiggly-2">
                <feTurbulence id="turbulence" baseFrequency="0.02" numOctaves="3" seed="2"/>
                <feDisplacementMap in="SourceGraphic" scale="2"/>
              </filter>
              <filter id="squiggly-3">
                <feTurbulence id="turbulence" baseFrequency="0.02" numOctaves="3" seed="3"/>
                <feDisplacementMap in="SourceGraphic" scale="3"/>
              </filter>
              <filter id="squiggly-4">
                <feTurbulence id="turbulence" baseFrequency="0.02" numOctaves="3" seed="4"/>
                <feDisplacementMap in="SourceGraphic" scale="1"/>
              </filter>
            </defs>
          </svg>
        </div>
      </div>
    );
  }
}
