import { useEffect } from 'react';

const MartketSetimentWidget = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://widgets.myfxbook.com/scripts/fxOutlook.js?type=1&symbols=,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,31,32,33,34,36,37,38,40,41,42,43,45,46,47,48,49,50,51,103,107,129,131,136,137,1209,1233,1234,1235,1236,1245,1246,1247,1249,1252,1253,1259,1260,1327,1692,1694,1773,1778,1781,1806,1815,1816,1863,1864,1893,1959,1965,2012,2076,2090,2099,2103,2114,2115,2119,2326,2348,2438,2482,2511,2516,2519,2521,2603,2694,2729,2872,3001,3005,3240,3304,3473,3771,3887,4845,4963,5079,5281,5435,5539,5779,5851,5858,5879,6106,8397,8669,8686,8895,8899,9657,9667,10064,11817,12755,13517,13543,13614,13745,14216,14247,17184,19780,20010,34882,54505,69230,79789,81035,87770,109078,123633,135581,159484,161523,163962,165302,169594,171254,177761,180388,217545,228902,238006,244239,320540,330784,330788,356365,356944,356945,367960,397724,1241343,1366797,1398989,1535797,1535804,1536337,1536404,1541124,1624396,1631427';
    script.type = 'text/javascript';
    script.classList.add('powered');
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <div style={{ fontSize: '10px' }}>
        <a href="https://www.myfxbook.com" title="" className="myfxbookLink" target="_self" rel="noopener">
          Powered by Myfxbook.com
        </a>
      </div>
      <script type="text/javascript">showOutlookWidget()</script>
    </>
  );
};

export default MartketSetimentWidget;
