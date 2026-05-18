export const Log = async (stack, level, package_name, message, token) => {
  const allowedStacks = ["backend", "frontend"];
  const allowedLevels = ["debug", "info", "warn", "error", "fatal"];
  
  if (!allowedStacks.includes(stack)) throw new Error("Invalid stack");
  if (!allowedLevels.includes(level)) throw new Error("Invalid level");

  const body = {
    stack,
    level,
    package: package_name,
    message
  };

  try {
    const response = await fetch("http://4.224.186.213/evaluation-service/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      console.error("Failed to push log to server", await response.text());
    }
  } catch (error) {
    console.error("Logging middleware exception:", error);
  }
};
