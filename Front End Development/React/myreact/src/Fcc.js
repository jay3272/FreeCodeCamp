import React from 'react';

const JSX = <div>
<h1>Heading.</h1>
<p>Paragraph</p>
<ul>
<li>Coffee</li>
<li>Tea</li>
<li>Milk</li>
</ul>
</div>;  ;

function Fcc() {
  return (
    <div>
      {JSX}
    </div>
  );
}

export default Fcc;
