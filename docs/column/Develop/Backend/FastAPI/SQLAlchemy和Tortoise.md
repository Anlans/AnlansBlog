# SQLAlchemy和Tortoise

## 介绍

这两个都是ORM，什么是ORM？

对象关系映射（ORM），
Put another way, you can see the ORM as the layer that connects [object oriented programming](https://www.freecodecamp.org/news/four-pillars-of-object-oriented-programming/) (OOP) to relational databases.

>   换句话说，您可以将 ORM 视为将面向对象编程 （OOP） 连接到关系数据库的层。

While using SQL for this purpose isn't necessarily a bad idea, the ORM and ORM tools help simplify the interaction between relational databases and different OOP languages.

>   虽然将 SQL 用于此目的不一定是一个坏主意，但 ORM 和 ORM 工具有助于简化关系数据库和不同 OOP 语言之间的交互。 

SQLAlchemy和Tortoise-ORM都是Python中的ORM（对象关系映射）工具，它们用于简化数据库操作并将数据库交互抽象为Python对象，从而提高开发效率和代码可读性。不过，两者在设计哲学、特性和使用场景上有所差异。

**SQLAlchemy:**

-   SQLAlchemy是一个成熟的、高度灵活的ORM框架，它不仅提供了ORM功能，还包含一个强大的SQL表达式语言，允许开发者编写复杂的查询而不仅仅是简单的ORM映射。
-   它支持多种数据库后端，包括但不限于SQLite、PostgreSQL、MySQL、Oracle、Microsoft SQL Server等。
-   SQLAlchemy具有丰富的功能集，包括但不限于事务管理、连接池、数据迁移工具Alembic等。
-   SQLAlchemy的使用相对复杂，因为它提供了低级和高级两种使用方式，使得开发者能根据需要选择更加精细的控制或更简洁的声明式风格。
-   SQLAlchemy 2.x版本相对于1.x有较大更新，使用时需要注意版本差异。

**Tortoise-ORM:**

-   Tortoise-ORM是一个较新的、异步的ORM库，专为使用async/await语法的现代异步Python编程设计。
-   与SQLAlchemy相比，Tortoise-ORM的API设计更为简洁，更易于上手，特别是在构建异步应用时。
-   它支持PostgreSQL、MySQL、SQLite等数据库，并且完全基于异步IO，适合构建高性能的异步Web服务和应用程序。
-   Tortoise-ORM强调零依赖配置，即无需手动创建数据库会话或引擎，通过简单的初始化脚本即可开始使用。
-   由于其异步特性，Tortoise-ORM更适合那些需要处理大量并发IO操作，追求高响应性的应用场景。

总结来说，如果你正在开发一个同步的应用程序，或者需要**高度定制化的数据库交互逻辑，SQLAlchemy**可能是更好的选择。而如果你的项目是**基于异步IO的现代**Python应用，**追求高性能和简洁**的数据库访问层，**Tortoise-ORM**则可能更加合适。

## 使用

这部分分别介绍了两个ORM模型的具体使用代码，看官们也可以将这些用例稍微修改后放在自己的FastAPI项目中使用。

### SQLAlchemy的使用

在我们新建一个项目，在`main.py`文件中写入以下代码：
```python
from fastapi import FastAPI
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import declarative_base, sessionmaker
from sqlalchemy import Column, Integer, String
from pydantic import BaseModel


app = FastAPI()

# 数据库连接配置
DATABASE_URL = "sqlite+aiosqlite:///sqlalchemy_test.db"

# 创建异步引擎
engine = create_async_engine(DATABASE_URL)

# 创建会话工厂
async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

# 声明Base类
Base = declarative_base()

# 定义User模型
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)


# 创建提交时的参数
class UserModel(BaseModel):
    name: str
    email: str


# 启动时创建数据表
@app.on_event("startup")
async def startup_event():
    """在应用启动时创建所有表。"""
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


@app.post("/users/")
async def create_user(user: UserModel):
    async with async_session() as session:
        new_user = User(**user.dict())
        session.add(new_user)
        await session.commit()
        return {"new_user": new_user}

```

本用例选择使用`sqlite`数据库非常轻量。只需要按照`"sqlite+aiosqlite:///sqlalchemy_test.db" `这种写法即可，其中`sqlalchemy_test.db`这里随便填写你的数据库名字（如a.db、funny.db）。

打开我们的控制台，mac用户可以直接点击pycharm下的terminal，然后输入

`uvicorn main:app --reload --port 2345`命令即可启动FastAPI应用。可以看到当出现提示的时候表示已经启动成功，

![image-20240508105955302](https://product-1256871806.cos.ap-shanghai.myqcloud.com/imgs202405081059439.png)

这时也已经自动创建了对应的sqlite数据库，如下目录`sqlalchemy_test.db`就是我们在代码中填入的库名。

![image-20240508110041877](https://product-1256871806.cos.ap-shanghai.myqcloud.com/imgs202405081100995.png)

现在让我们打开浏览器输入http://127.0.0.1:2345 这个网址，可以看到已经启动了（这里的美观输出是我的插件，不用理会）

![image-20240508110207143](https://product-1256871806.cos.ap-shanghai.myqcloud.com/imgs202405081102201.png)

那接下来输入http://127.0.0.1:2345/docs 查看对应的api文档接口

![image-20240508110302054](https://product-1256871806.cos.ap-shanghai.myqcloud.com/imgs202405081103148.png)

然后点击`/usrs/`接口的`try out`按钮并填入对应的参数后点击`Execute`进行提交。

![image-20240508110427589](https://product-1256871806.cos.ap-shanghai.myqcloud.com/imgs202405081104624.png)



通过pycharm自带的数据库工具查看我们的数据库

![image-20240508110619214](https://product-1256871806.cos.ap-shanghai.myqcloud.com/imgs202405081106269.png)

配置到我们的`sqlalchemy_test.db`文件的地址![image-20240508110713100](https://product-1256871806.cos.ap-shanghai.myqcloud.com/imgs202405081107179.png)

就可以查看对应的数据库表结构数据了。

![image-20240508110801894](https://product-1256871806.cos.ap-shanghai.myqcloud.com/imgs202405081108966.png)

### Tortoise的使用

上面讲到了SQLAlchemy的用法以及对如何查看数据库中的数据，下面我对Tortoise的使用进行讲解描述。

同样的，我们新建一个main2.py文件（与上述的main.py区分开）

```python
# main2.py
import os.path

from fastapi import FastAPI
from tortoise.contrib.fastapi import register_tortoise
from pydantic import BaseModel
from models import User
from os.path import expanduser

app = FastAPI()

current_dir = os.getcwd()
db_path = os.path.join(current_dir, "sqlalchemy_test2.db")  # 将数据库文件放在当前目录下

TORTOISE_ORM_CONFIG = {
    "connections": {"default": f"sqlite:///{db_path}"},  # 这里只需要指定 sqlite:// 即可
    "apps": {
        "models": {
            "models": ["models"],  # 声明模型所在的位置
            "default_connection": "default",
        }
    }
}

# 注册Tortoise到FastAPI应用
register_tortoise(
    app,
    config=TORTOISE_ORM_CONFIG,
    generate_schemas=True,  # 自动创建表，默认启动时执行
    add_exception_handlers=True,
)


class UserModel(BaseModel):
    name: str
    email: str


@app.post("/users/")
async def create_user(user: UserModel):
    user_obj = await User.create(**user.dict())
    return user_obj
```

可以看到Tortoise的数据库操作确实简单很多：
```python
async def create_user(user: UserModel):
    user_obj = await User.create(**user.dict())
    return user_obj
```

## 比较

SQLAlchemy和Tortoise相比，前者更全面，后者更简单。