import Actions from './actions';

const {LOAD_TREES, LOAD_REPOS} = Actions.Types;

export default ({type, payload}, state) => {
	switch (type) {
	case LOAD_TREES:
		return Object.assign({}, state, {
			trees: payload,
		});
	case LOAD_REPOS:
		return Object.assign({}, state, {
			repos: payload,
		});
	default:
		return state;
	}
};
