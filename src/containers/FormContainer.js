import React, { Component } from "react";
import CheckboxOrRadioGroup from "../components/CheckboxOrRadioGroup";
import SingleInput from "../components/SingleInput";
import TextArea from "../components/TextArea";
import Select from "../components/Select";
import Pill from "../components/Pill";
import MultiSelect from "../components/MultiSelectCheckboxes";

const options = [
  { name: "Facilities", value: "facilities" },
  { name: "Finance", value: "finance" },
  { name: "Front Office", value: "front_office" },
  { name: "Human Resources", value: "human_resources" },
  { name: "IT", value: "it" },
  { name: "Management Team", value: "management_team" },
  { name: "Planning", value: "planning" },
  { name: "Sales", value: "sales" }
];
const defaultValues = [
  { name: "Management Team", value: "management_team" },
  { name: "Sales", value: "sales" }
];

class FormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ownerName: "",
      petSelections: [],
      selectedPets: [],
      ageOptions: [],
      ownerAgeRangeSelection: "",
      siblingOptions: [],
      siblingSelection: [],
      currentPetCount: 0,
      description: "",
      selectedItem: "",
      items: [],
      display: "block",
      options: [],
      fruits: [],
      selectedOptions: []
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleFullNameChange = this.handleFullNameChange.bind(this);
    this.handleCurrentPetCountChange = this.handleCurrentPetCountChange.bind(
      this
    );
    this.handleAgeRangeSelect = this.handleAgeRangeSelect.bind(this);
    this.handlePetSelection = this.handlePetSelection.bind(this);
    this.handleSiblingsSelection = this.handleSiblingsSelection.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
  }

  componentDidMount() {
    fetch("./fake_db.json")
      .then(res => res.json())
      .then(data => {
        this.setState({
          ownerName: data.ownerName,
          petSelections: data.petSelections,
          selectedPets: data.selectedPets,
          ageOptions: data.ageOptions,
          ownerAgeRangeSelection: data.ownerAgeRangeSelection,
          siblingOptions: data.siblingOptions,
          siblingSelection: data.siblingSelection,
          currentPetCount: data.currentPetCount,
          description: data.description,
          options: data.options,
          fruits: data.fruits
        });
      });
  }
  handleMultiChange = options => {
    this.setState(() => {
      return {
        selectedOptions: options
      };
    });
  };
  handleFullNameChange(e) {
    this.setState({ ownerName: e.target.value }, () =>
      console.log("name:", this.state.ownerName)
    );
  }
  handleCurrentPetCountChange(e) {
    this.setState({ currentPetCount: e.target.value }, () =>
      console.log("pet count", this.state.currentPetCount)
    );
  }
  handleAgeRangeSelect(e) {
    this.setState({ ownerAgeRangeSelection: e.target.value }, () =>
      console.log("age range", this.state.ownerAgeRangeSelection)
    );
  }
  handlePetSelection(e) {
    const newSelection = e.target.value;
    let newSelectionArray;
    if (this.state.selectedPets.indexOf(newSelection) > -1) {
      newSelectionArray = this.state.selectedPets.filter(
        s => s !== newSelection
      );
    } else {
      newSelectionArray = [...this.state.selectedPets, newSelection];
    }
    this.setState({ selectedPets: newSelectionArray }, () =>
      console.log("pet selection", this.state.selectedPets)
    );
  }
  handleSiblingsSelection(e) {
    this.setState({ selectedOptions: [e.target.value] }, () =>
      console.log("siblingz", this.state.siblingSelection)
    );
  }
  handleDescriptionChange(e) {
    this.setState({ description: e.target.value }, () =>
      console.log("description", this.state.description)
    );
  }
  handleClearForm(e) {
    e.preventDefault();
    this.setState({
      ownerName: "",
      selectedPets: [],
      ownerAgeRangeSelection: "",
      siblingSelection: [],
      currentPetCount: 0,
      description: "",
      items: [],
      selectedOptions: defaultValues
    });
    window.location.reload();
  }
  handleFormSubmit(e) {
    e.preventDefault();

    const formPayload = {
      ownerName: this.state.ownerName,
      selectedPets: this.state.selectedPets,
      ownerAgeRangeSelection: this.state.ownerAgeRangeSelection,
      siblingSelection: this.state.siblingSelection,
      currentPetCount: this.state.currentPetCount,
      description: this.state.description,
      items: this.state.items,
      selectedOptions: this.state.selectedOptions
    };

    console.log("Send this in a POST request:", formPayload);
    alert(JSON.stringify(formPayload, null, 2));
    this.handleClearForm(e);
  }

  onSelect = event => {
    event.preventDefault();
    let items = [...this.state.items];
    items.push(event.target.value);
    this.setState({
      selectedItem: event.target.value,
      items,
      display: "none"
    });
  };

  changeFirstLetterOfText = obj => {
    return obj.title.charAt(0).toUpperCase() + obj.title.slice(1);
  };
  setSelectVisible = () => {
    this.setState({ display: "block" });
  };
  removeItemFromWrapper = fruit => {
    const { items } = this.state;
    const filteredItems = items.filter(item => {
      return item !== fruit;
    });
    this.setState({ items: filteredItems });
  };

  render() {
    const { items, selectedItem, fruits } = this.state;

    return (
      <form
        id="create-course-form"
        className="container"
        onSubmit={this.handleFormSubmit}
      >
        <SingleInput
          inputType={"text"}
          title={"Full name"}
          name={"name"}
          controlFunc={this.handleFullNameChange}
          content={this.state.ownerName}
          placeholder={"Type first and last name here"}
          disabled={false}
          tabIndex={"1"}
        />
        <Select
          name={"ageRange"}
          placeholder={"Choose your age range"}
          controlFunc={this.handleAgeRangeSelect}
          options={this.state.ageOptions}
          selectedOption={this.state.ownerAgeRangeSelection}
          disabled={false}
          tabIndex={"2"}
        />
        <CheckboxOrRadioGroup
          title={"Which kinds of pets would you like to adopt?"}
          setName={"pets"}
          type={"checkbox"}
          controlFunc={this.handlePetSelection}
          options={this.state.petSelections}
          selectedOptions={this.state.selectedPets}
          disabled={false}
          tabIndex={"3"}
        />
        <CheckboxOrRadioGroup
          title={
            "Are you willing to adopt more than one pet if we have siblings for adoption?"
          }
          setName={"siblings"}
          controlFunc={this.handleSiblingsSelection}
          type={"radio"}
          options={this.state.siblingOptions}
          selectedOptions={this.state.siblingSelection}
          disabled={false}
          tabIndex={"4"}
        />
        <SingleInput
          inputType={"number"}
          title={"How many pets do you currently own?"}
          name={"currentPetCount"}
          controlFunc={this.handleCurrentPetCountChange}
          content={this.state.currentPetCount}
          placeholder={"Enter number of current pets"}
          disabled={false}
          tabIndex={"5"}
        />
        <TextArea
          title={
            "If you currently own pets, please write their names, breeds, and an outline of their personalities."
          }
          rows={5}
          resize={false}
          content={this.state.description}
          name={"currentPetInfo"}
          controlFunc={this.handleDescriptionChange}
          placeholder={"Please be thorough in your descriptions"}
          disabled={false}
          tabIndex={"6"}
        />
        <label>Choose your favorite items: </label>
        <div
          style={{ display: items.length === 0 ? "none" : "flex" }}
          onClick={this.setSelectVisible}
          className="pill-wrapper"
        >
          {items.map((item, index) => (
            <Pill
              remove={this.removeItemFromWrapper}
              key={index}
              fruit={item}
            />
          ))}
        </div>
        <select
          style={{ display: "block" }}
          onChange={this.onSelect}
          className="select"
          disabled=""
          tabIndex="7"
        >
          <Pill fruit={selectedItem} />
          {fruits.map((fruit, index) => (
            <option key={index}>{this.changeFirstLetterOfText(fruit)}</option>
          ))}
        </select>
        <label>Choose your favorite options: </label>
        <MultiSelect
          options={options}
          defaultValues={defaultValues}
          name="department"
          onChange={this.handleMultiChange}
        />
        <section>
          <div className="info__title">Selected options:</div>"
          {this.state.selectedOptions.map((option, index) => (
            <span key={option.value}>{(index ? ", " : "") + option.value}</span>
          ))}
          "
        </section>
        <input
          type="submit"
          className="btn btn-primary float-right"
          value="Submit"
        />
        <button
          className="btn btn-link float-left"
          onClick={this.handleClearForm}
        >
          Clear form
        </button>
      </form>
    );
  }
}

export default FormContainer;
