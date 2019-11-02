from locust import HttpLocust, TaskSet, task

class UserBehavior(TaskSet):

    @task
    def place_order(self):
        self.client.post("/api/order", {"customer":"SUSEBot", "product":"Geeko", "paymethod": 'Cash', "price": 50, "timestamp": '2019-30-31 03:30:18'})


class WebsiteUser(HttpLocust):
    task_set = UserBehavior
    min_wait = 500
    max_wait = 9000
