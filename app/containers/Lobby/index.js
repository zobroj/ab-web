import Lobby from 'components/Lobby';
import { createStructuredSelector } from 'reselect';
import { tableReceived, lineupReceived, updateReceived } from '../Table/actions';
import { makeSelectLobby } from './selectors';
import web3Connect from '../AccountProvider/web3Connect';

export function mapDispatchToProps() {
  return {
    tableReceived,
    lineupReceived,
    updateReceived,
  };
}

const mapStateToProps = createStructuredSelector({
  lobby: makeSelectLobby(),
});

export default web3Connect(mapStateToProps, mapDispatchToProps)(Lobby);
