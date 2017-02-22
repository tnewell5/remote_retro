import React from "react"
import { shallow } from "enzyme"
import { expect } from "chai"
import sinon from "sinon"
import CategoryColumn from "../../web/static/js/components/category_column"

import Room from "../../web/static/js/components/room"

describe("<Room>", () => {
  context("when it renders", () => {
    const props = {
      retroChannel: { on: () => {} },
      users: []
    }
    let component

    before(() => {
      component = shallow(<Room { ...props } />)
    })

    it("render a column for each category", () => {
      expect(component).contains(
          <div class="ui equal width padded grid category-columns-wrapper">
            <CategoryColumn category="happy" ideas={ [] }/>
            <CategoryColumn category="sad" ideas={ [] }/>
            <CategoryColumn category="confused" ideas={ [] }/>
          </div>
      ).to.equal(true)
    })
  })

  describe(".handleIdeaSubmission", () => {
    it("pushes the idea to the room channel", () => {
      const onStub = () => {}
      const retroChannel = { push: sinon.spy(), on: onStub }

      const roomComponent = shallow(
        <Room retroChannel={ retroChannel } users={ [] }/>
      )

      roomComponent
        .instance()
        .handleIdeaSubmission({ category: "sad", body: "we don't use our linter" })

      expect(
        retroChannel.push.calledWith("new_idea", { category: "sad", body: "we don't use our linter" })
      ).to.equal(true)
    })
  })
})
