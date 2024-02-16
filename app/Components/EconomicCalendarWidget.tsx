import React from 'react';

const EconomicCalendarWidget: React.FC = () => {
  return (
    <>
      <iframe
        src="https://widget.myfxbook.com/widget/calendar.html?lang=en&impacts=0,1,2,3&symbols="
        style={{ border: '0', width: '100%', height: '500px' }}
      ></iframe>
      <div style={{ marginTop: '10px' }}>
        <div
          style={{
            width: 'fit-content',
            margin: 'auto',
            fontFamily: 'roboto,sans-serif!important',
            fontSize: '13px',
            color: '#666666',
          }}
        >
          <a
            href="https://www.myfxbook.com/forex-economic-calendar?utm_source=widget13&utm_medium=link&utm_campaign=copyright"
            title="Economic Calendar"
            className="myfxbookLink"
            target="_blank"
            rel="noopener"
            style={{ color: '#666666' }}
          >
            <b>Economic Calendar</b>
          </a>
          by Myfxbook.com
        </div>
      </div>
    </>
  );
};

export default EconomicCalendarWidget;
