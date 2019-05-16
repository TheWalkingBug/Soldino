import { connect } from 'react-redux';

import CommonHome from '../components/CommonHome';

export default connect(state => ({ authData: state.user }))(CommonHome);
