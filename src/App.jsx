import { useState } from "react";

function generateRandomNumber() {
  return Math.floor(Math.random() * 1000);
}

function App() {
  const [friendsList, setFriendsList] = useState([]);

  const pravatarGen = `https://i.pravatar.cc/${generateRandomNumber()}`;

  function handleFriendList(friend) {
    setFriendsList((currFriendList) => [friend, ...currFriendList]);
  }

  return (
    <>
      <div>
        <h2>Hi, Tomikimi</h2>
      </div>

      <div className="app">
        <ListofFriends friendsList={friendsList}>
          <AddFriend
            onAddFriend={handleFriendList}
            pravatar={pravatarGen}
          ></AddFriend>
        </ListofFriends>
        <SplitBill></SplitBill>
      </div>
    </>
  );
}

function ListofFriends({ friendsList, children }) {
  const divStyle = {
    marginBottom: "1.5rem",
  };
  const [formToggle, setFormToggle] = useState(false);
  return (
    <>
      <div className="sidebar">
        {friendsList.length ? (
          <ul>
            {friendsList.map((friend) => (
              <li key={friend.id}>
                <img src={friend.image} alt="" />
                <h3>{friend.name}</h3>
                <p>
                  {friend.balance === 0
                    ? `You and ${friend.name} are even`
                    : `Hello ${friend.name}`}
                </p>
                <button type="button" className="button">
                  Select
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div style={divStyle}>
            <h1>Add Friends to your List 🧑🏽‍🤝‍👩🏽</h1>
          </div>
        )}

        {formToggle ? children : ""}
        <button className="button" onClick={() => setFormToggle(!formToggle)}>
          {formToggle ? `Close` : `Add Friend`}
        </button>
      </div>
    </>
  );
}

function AddFriend({ onAddFriend, pravatar }) {
  const [friend, setFriend] = useState("");

  function handleName(e) {
    setFriend(e.target.value);
  }

  function handleAddFriend(e) {
    e.preventDefault();

    if (!friend) return;

    const confirm = window.confirm(
      `Do you want to add ${friend} to your list...🤔`,
    );

    let data = {
      id: Date.now(),
      name: friend,
      image: pravatar,
      balance: 0,
    };

    if (confirm) {
      onAddFriend(data);
      setFriend("");
    }
  }
  return (
    <>
      <form className="form-add-friend" onSubmit={handleAddFriend}>
        <label htmlFor="friend">🧑🏽‍🤝‍👩🏽Friend name</label>
        <input name="friend" type="text" value={friend} onChange={handleName} />

        <label htmlFor="image">🖼️Image URL</label>
        <input name="image" type="text" value={pravatar} readOnly />

        <button className="button">Add</button>
      </form>
    </>
  );
}

function SplitBill() {
  return (
    <>
      <form className="form-split-bill">
        <h2>split a bill with daniel</h2>
        <label htmlFor="bill_value">💰Bill Value</label>
        <input name="bill_value" type="text" />

        <label htmlFor="expense">🧍🏽‍♂️Your Expense</label>
        <input name="expense" type="text" />

        <label htmlFor="expense">🧑🏽‍🤝‍👩🏽Daniels Expense</label>
        <input name="expense" disabled type="text" />

        <label htmlFor="expense">🤑Who is paying the bill?</label>
        <select>
          <option value="you">You</option>
          <option value="friend">Friend</option>
        </select>
        <button className="button">Split Bill</button>
      </form>
    </>
  );
}

export default App;
