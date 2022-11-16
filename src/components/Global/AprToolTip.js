import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { HiQuestionMarkCircle } from "react-icons/hi";

import React from 'react'

const AprToolTip = () => {

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Simple tooltip
    </Tooltip>
  );
  return (
    <OverlayTrigger
      placement="right"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
    >
      <HiQuestionMarkCircle></HiQuestionMarkCircle>
    </OverlayTrigger>
  )
}

export default AprToolTip
