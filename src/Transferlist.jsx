import React, { useState } from "react";

const Transferlist = () => {
  const list = ["Item A", "Item B", "Item C"];
  const [availableList, setAvailableList] = useState(list);
  const [selectedList, setSelectedList] = useState([]);
  const [checked, setChecked] = useState({});

  const handleCheck = (item, ischecked) => {
    setChecked((prev) => {
      let updated = { ...prev, [item]: ischecked };
      console.log(updated);
      return updated;
    });
  };

  const handleToSelected = () => {
    const toMove = availableList.filter((item) => checked[item]);
    setSelectedList((prev) => {
      let updated = [...prev, ...toMove];
      return updated;
    });
    let toRetain = availableList.filter((item) => !checked[item]);
    setAvailableList((prev) => {
      let updated = [...toRetain];
      return updated;
    });
    // setAvailableList((prev) => prev.filter((item) => !checked[item]));
    resetChecked(toMove);
  };

  const handleToAvailable = () => {
    const toMove = selectedList.filter((item) => checked[item]);
    setAvailableList((prev) => {
      let updated = [...prev, ...toMove];
      return updated;
    });
    let toRetain = selectedList.filter((item) => !checked[item]);
    setSelectedList((prev) => {
      let updated = [...toRetain];
      return updated;
    });
    // setSelectedList((prev) => prev.filter((item) => !checked[item]));
    resetChecked(toMove);
    console.log(checked);
  };

  const resetChecked = (items) => {
    setChecked((prev) => {
      let updated = { ...prev };
      items.forEach((item) => {
        delete updated[item];
      });
      return updated;
    });
  };

  return (
    <div className="container">
      <div>
        <h3>Available List</h3>
        {availableList.map((item, index) => (
          <div className="available-list" key={index}>
            <label>
              {/* {JSON.stringify(checked[item])}--{typeof checked[item]} */}
              <input
                type="checkbox"
                checked={!!checked[item]}
                onChange={(e) => handleCheck(item, e.target.checked)}
              />
            </label>
            {item}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <button onClick={handleToSelected}>➡️</button>
        <button onClick={handleToAvailable}>⬅️</button>
      </div>
      <div>
        <h3>Selected List</h3>
        {selectedList.map((item, index) => (
          <div key={index}>
            <label>
              {/* {JSON.stringify(checked[item])}-{typeof checked[item]} */}
              <input
                type="checkbox"
                checked={!!checked[item]}
                onChange={(e) => handleCheck(item, e.target.checked)}
              />
            </label>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transferlist;
