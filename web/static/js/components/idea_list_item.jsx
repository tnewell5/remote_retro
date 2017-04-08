import React from "react"
import * as AppPropTypes from "../prop_types"
import styles from "./css_modules/idea_list_item.css"

function IdeaListItem(props) {
  let { idea, currentPresence } = props

  return (
    <li className="item" title={idea.body} key={idea.id}>
      <span className={styles.authorAttribution}>{idea.author}:</span> {idea.body}
      { currentPresence.user.is_facilitator ?
        <i
          id={idea.id}
          title="Delete Idea"
          className={styles.delete + ` remove circle icon`}
          onClick={props.handleDelete}
        >
        </i> : null
      }
    </li>
  )
}

IdeaListItem.propTypes = {
  idea: AppPropTypes.idea.isRequired,
  currentPresence: AppPropTypes.presence.isRequired,
}

export default IdeaListItem
