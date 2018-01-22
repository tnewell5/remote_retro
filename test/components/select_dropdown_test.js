import React from "react"
import { shallow } from "enzyme"

import SelectDropdown from "../../web/static/js/components/select_dropdown"

describe("SelectDropdown component", () => {
  const defaultProps = {
    labelName: "label",
    value: "value",
    onChange() {},
    selectOptions: [],
  }
  let wrapper

  it("renders with a 'required' class", () => {
    wrapper = shallow(<SelectDropdown {...defaultProps} />)
    expect(wrapper.find(".required")).to.have.length(1)
  })

  context("when pointerText is not provided as a prop", () => {
    it("does not render the pointing label", () => {
      wrapper = shallow(<SelectDropdown {...defaultProps} />)
      expect(wrapper.find(".pointing")).to.have.length(0)
    })
  })
})
