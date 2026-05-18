# Notification System Design

## 1. Fetching the Data
The app pulls live notification data directly from the provided evaluation API. If the API ever goes down or restricts access, the frontend gracefully falls back to a structural mock dataset. This ensures the UI doesn't crash and the sorting logic can still be properly evaluated.

## 2. Priority and Weighing
To build the "Priority Inbox" feature, I assigned a simple numeric weight to each notification type. This makes the sorting logic very straightforward:
- **Placement**: 3 (Highest priority)
- **Result**: 2 (Medium priority)
- **Event**: 1 (Lowest priority)

## 3. The Sorting Algorithm
The sorting uses a standard array sort that checks two conditions:
1. **Category Weight**: We first compare the predefined numeric weights. Notifications with higher weights automatically bubble up to the top.
2. **Recency (Tie-breaker)**: If two notifications have the exact same category weight (for example, two "Placement" updates), I parse their `Timestamp` into a Date object and sort them in descending order. This ensures the newest updates always appear first within their specific category.

## 4. Top N and Filtering
Users can change how many notifications they want to see (the Top N limit) and filter by specific categories. The app dynamically handles this by running the type filter first, triggering the sort algorithm, and finally slicing the array (`.slice(0, limit)`) to render exactly the number requested without overloading the browser DOM.

## 5. Future Scalability
Right now, sorting the array in the frontend memory works perfectly and runs in O(N log N) time, which is more than fast enough for standard API payloads. However, if this were to scale to millions of real-time incoming alerts, the backend should ideally handle the computation using a Max-Heap or Priority Queue data structure. That way, inserting a new notification and fetching the top 10 would drop to an O(log N) insertion time, significantly reducing the load on the client.
