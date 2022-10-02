import React, { useContext } from 'react';
import { createHashHistory } from 'history';

const history = createHashHistory();

const Context = (
    React.createContext()
);

class Provider extends React.Component {
    constructor (ps) {
        super(ps);

        this.state = {
            history,
            location: history.location
        };

        // This is a bit of a hack. We have to start listening for location
        // changes here in the constructor in case there are any <Redirect>s
        // on the initial render. If there are, they will replace/push when
        // they mount and since cDM fires in children before parents, we may
        // get a new location before the <Router> is mounted.
        this._isMounted = false;
        this._pendingLocation = null;

        this.unlisten = history.listen(action => {
            this._pendingLocation = action.location;
        });
    }
    componentDidMount() {
        this._isMounted = true;

        if (this.unlisten) {
            // Any pre-mount location changes have been captured at
            // this point, so unregister the listener.
            this.unlisten();
        }

        this.unlisten = history.listen(action => {
            if (this._isMounted) {
                this.setState({ location: action.location });
            }
        });

        if (this._pendingLocation) {
            this.setState({ location: this._pendingLocation });
        }
    }

    componentWillUnmount() {
        if (this.unlisten) {
            this.unlisten();
            this._isMounted = false;
            this._pendingLocation = null;
        }
    }

    render () {
        return (
            <Context.Provider value={{
                history: history,
                location: this.state.location
            }}>
                { this.props.children }
            </Context.Provider>
        )
    }
}

const useLocation = () => (
    useContext(Context).location
)
const useHistory = () => (
    useContext(Context).history
)

export {
    Provider as Location,
    useLocation,
    useHistory,
}
