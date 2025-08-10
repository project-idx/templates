# Agent Development Kit (ADK) Template

Using the ADK in Firebase Studio requires setting the proper environment variables and folder structure.

## Requirements

1. Set environment variables so your agents can access the proper LLM and services.
2. Use a folder structure supported by `adk web`.

## Getting Started

This template supports both Python and Java for ADK development.

### Python

1.  **Environment Setup:**

    This template comes with a pre-configured Python environment. To activate it, open a new terminal and run:

    ```bash
    source .venv/bin/activate
    ```

2.  **Set API Key:**

    Open the `.env.local` file and replace `PASTE_YOUR_ACTUAL_API_KEY_HERE` with your Gemini API key. You can get a key from [Google AI Studio](https://g.co/ai/idxGetGeminiKey).

3.  **Run the Agent:**

    You can run the agent in two ways:

    *   **Terminal:**

        ```bash
        adk run multi_tool_agent
        ```

    *   **Web UI:**

        ```bash
        adk web multi_tool_agent
        ```

        This will start a web server with an interactive UI for testing your agent.

### Java

This template is primarily set up for Python. To use Java, you will need to:

1.  **Install a Java Development Kit (JDK):** Version 17 or higher is recommended.
2.  **Set up a build tool:** Use Maven or Gradle to manage your dependencies.
3.  **Add ADK dependencies:** Add the `google-adk` and `google-adk-dev` dependencies to your `pom.xml` or `build.gradle` file.
4.  **Create your agent:** Write your agent logic in a Java file.
5.  **Run the agent:** Use the ADK web server to run and test your agent.

For a detailed guide on getting started with the ADK for Java, please see the [official documentation](https://google.github.io/adk-docs/get-started/quickstart-java/).

## Key Concepts

*   **Agents:** The fundamental building blocks of the ADK. Agents are autonomous entities that can perceive their environment, make decisions, and take actions to achieve their goals.
*   **Tools:** Functions that agents can use to interact with the outside world. Tools can be used to access APIs, databases, or any other external service.
*   **Sessions:** A mechanism for managing the state of an agent and for storing information in long-term memory. This allows agents to learn from their experiences and to maintain context across multiple interactions.
*   **Multi-agent Systems:** The ADK supports the creation of multi-agent systems, where multiple agents can collaborate to solve complex problems.

## Development and Testing

*   **`adk run`:** Run your agent directly in the terminal for quick, interactive testing.
*   **`adk web`:** Use the web-based UI for a more interactive testing and debugging experience.
*   **Evaluation:** The ADK provides a framework for evaluating your agents to ensure they are behaving as expected. See the [official documentation](https://google.github.io/adk-docs/evaluation/overview/) for more details.

## Security

*   **Least Privilege:** Agents should only be given the permissions and access they absolutely need.
*   **Input Validation and Output Sanitization:** Always validate and sanitize inputs and outputs to and from the LLM and tools.
*   **Secure Tool Design:** Write your tools defensively and prefer smaller, single-purpose tools.
*   **Sandboxed Code Execution:** The `BuiltInCodeExecutor` runs code in a restricted environment to mitigate risks.

## Resources

*   **Official Documentation:** [https://google.github.io/adk-docs/](https://google.github.io/adk-docs/)
*   **ADK for Python GitHub Repository:** [https://github.com/google/adk-python](https://github.com/google/adk-python)
*   **ADK for Java GitHub Repository:** [https://github.com/google/adk-java](https://github.com/google/adk-java)
*   **ADK Samples:** [https://github.com/google/adk-samples](https://github.com/google/adk-samples)
*   **[ADK Videos](https://www.youtube.com/playlist?list=PLOU2XLYxmsIIAPgM8FmtEcFTXLLzmh4DK)**
