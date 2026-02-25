function App() {
  return (
    <>
      <div>
        <h2>Hi, Tomikimi</h2>
      </div>
      <div className="app">
        <div>
          <div className="sidebar">
            <ul>
              <li>
                <img src="https://i.pravatar.cc/35" alt="" />
                <h3>Daniel</h3>
                <p>You and Daniel are even</p>
                <button type="button" className="button">
                  Select
                </button>
              </li>
              <li>
                <img src="https://i.pravatar.cc/40" alt="" />
                <h3>Fisoye</h3>
                <p>You and Fisoye are even</p>
                <button type="button" className="button">
                  Select
                </button>
              </li>
              <li>
                <img src="https://i.pravatar.cc/31" alt="" />
                <h3>Otagbo</h3>
                <p>You and Otagbo are even</p>
                <button type="button" className="button">
                  Select
                </button>
              </li>
            </ul>

            <form className="form-add-friend" action="">
              <label htmlFor="friend">🧑🏽‍🤝‍👩🏽Friend name</label>
              <input name="friend" type="text" />

              <label htmlFor="image">🖼️Image URL</label>
              <input name="image" type="text" />

              <button className="button">Add</button>
            </form>

            <div className="button">Add Friend</div>
          </div>
        </div>
        <div>bill form</div>
      </div>
    </>
  );
}

export default App;
