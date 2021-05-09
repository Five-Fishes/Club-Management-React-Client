import './footer.scss';

import React from 'react';
import { Translate } from 'react-jhipster';

const Footer: React.FC<{}> = () => (
  <div id="app-footer" className="bg-primary text-white text-center mt-4">
    <Translate contentKey="footer" />
  </div>
);

export default Footer;
