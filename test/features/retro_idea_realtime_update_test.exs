defmodule RetroIdeaRealtimeUpdateTest do
  use RemoteRetro.IntegrationCase, async: false
  alias RemoteRetro.Idea

  @mock_user Application.get_env(:remote_retro, :mock_user)

  test "the immediate appearance of other users' submitted ideas", %{session: session_one, retro: retro} do
    session_two = new_browser_session()

    retro_path = "/retros/" <> retro.id
    session_one = authenticate(session_one) |> visit(retro_path)
    session_two = authenticate(session_two) |> visit(retro_path)

    ideas_list_text = session_one |> find(Query.css(".sad.ideas")) |> Element.text()
    refute String.contains?(ideas_list_text, "user stories lack clear business value")

    submit_idea(session_two, %{category: "sad", body: "user stories lack clear business value" })

    ideas_list_text = session_one |> find(Query.css(".sad.ideas")) |> Element.text
    assert String.contains?(ideas_list_text, "user stories lack clear business value")
  end

  describe "when an idea already exists in a retro" do
    setup [:persist_user_for_retro, :persist_idea_for_retro]

    @tag user: Map.put(@mock_user, "email", "hiro@protagonist.com")
    @tag idea: %Idea{category: "sad", body: "no linter"}
    test "the immediate update of ideas edited by the facilitator", %{session: facilitator_session, retro: retro} do
      participant_session = new_browser_session()

      retro_path = "/retros/" <> retro.id
      facilitator_session = authenticate(facilitator_session) |> visit(retro_path)
      participant_session = authenticate(participant_session) |> visit(retro_path)

      facilitator_session |> find(Query.css(".edit.icon")) |> Element.click
      fill_in(facilitator_session, Query.text_field("editable_idea"), with: "No one uses the linter.")
      facilitator_session |> find(Query.button("Save")) |> Element.click

      ideas_list_text = participant_session |> find(Query.css(".sad.ideas")) |> Element.text

      assert String.contains?(ideas_list_text, "No one uses the linter.")
    end

    @tag user: Map.put(@mock_user, "email", "hiro@protagonist.com")
    @tag idea: %Idea{category: "happy", body: "slack time!"}
    test "the immediate removal of an idea deleted by the facilitator", %{session: facilitator_session, retro: retro} do
      participant_session = new_browser_session()

      retro_path = "/retros/" <> retro.id
      facilitator_session = authenticate(facilitator_session) |> visit(retro_path)
      participant_session = authenticate(participant_session) |> visit(retro_path)

      ideas_list_text = participant_session |> find(Query.css(".happy.ideas li")) |> Element.text
      assert ideas_list_text =~ ~r/slack time/

      delete_idea(facilitator_session, %{category: "happy", body: "slack time!"})

      assert find(participant_session, Query.css(".happy.ideas li", count: 0))
    end
  end
end
