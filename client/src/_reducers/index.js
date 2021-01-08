import { combineReducers } from 'redux';
import user from './user_reducer';

// 여러 Reducer들을 rootReducer로 합쳐주는 기능
const rootReducer = combineReducers({
    user,
});

export default rootReducer;
