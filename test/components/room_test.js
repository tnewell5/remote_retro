import React from "react"
import { shallow } from "enzyme"
import { expect } from "chai"
import sinon from "sinon"

import Room from "../../web/static/js/components/room"

describe("Room component", () => {
  describe(".handleIdeaSubmission", () => {
    it("pushes the idea to the room channel", () => {
      const onStub = () => {}
      const retroChannel = { push: sinon.spy(), on: onStub }

      const roomComponent = shallow(
        <Room retroChannel={ retroChannel } users={ [] }/>
      )

      roomComponent
        .instance()
                  <div className="three wide field">
                      <div class="ui checkbox">
                        <input type="checkbox" />
                        <label>Toggle Action Items</label>
                      </div>
                    </div>

      expect(
        retroChannel.push.calledWith("new_idea", { category: "sad", body: "we don't use our linter" })
      ).to.equal(true)
    })
  })
})
