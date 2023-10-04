
**Notice**: 
1. "advanced" marked logic will not be implemented in this MVP
2. "database" marked logic will require API design to interact with centralized database
3. "contract" marked logic will require API design to interact with smart contract

Overall architecture

![donex](donex.drawio.png)
### Extension
Extension for interacting mainly with end users. It will include the following feature groups:
1. onboard user: 
* create wallet
* import wallet
* sign - in with google (advanced)
2. onboard funds: 
* directly from imported wallet
* fiat on - ramp (advanced)
3. donate:
* detect address [database](#database)
* select donation tiers (1, 5, 10, custom) (default 5)
* select accepted denomination (USDT, USDC, ...) )(default USDT)
* transfer funds [contract](#smart-contract)

**Notes**: how to shorten logic 2, 3 in donate feature group so that user can just 1 - click (fallback on default options, shift responsibility of listing donation tiers to creators, ...)
### Smart contract


### Worker

### Registration site

### Analytics Dashboard (Advanced)
Cần làm Dashboard thống kê 
+ Thiết kế Database: 
	* User: Gồm thông tin tài khoản và mạng xã hội đã liên kết. 
	* Transaction: Mỗi lần donate sẽ có 1 transaction sinh ra, trong đó có người gửi người nhận số tiền và số tiền thực nhận, thông qua mạng xã hội nào 
	* Bảng xếp hạng, gồm user Id và số tiền donate, số tiền được donate và xếp hạng donate, xếp hạng được donate theo tuần, tháng và từ trước tới nay 
	* DonationInfo: Thông tin tổng kết donate và được donate của từng người dùng, theo tuần, tháng và từ trước tới nay 
+ 1 worker để làm việc nhận event và lưu các giao điện vào dữ liệu:
	* Task nhận event và sau đó lưu vào transaction 
	* Task từ transaction sẽ cập nhật lại xếp hạng của các user có liên quan trong DB 
+ 1 Server có API để lấy thông tin ra 
	* API đăng kí, liên kết tài khoản mạng xã hội và liên kết ví 
	* API đăng nhập, đăng xuất 
	* API donate (Ẩn danh hoặc không, có thể kèm theo tin nhắn hoặc không) 
	* API lấy thông tin bản thân (số tài khoản, thông tin các mạng xã hội đã liên kết, số dư, số tiền đã donate và được donate) 
	* API lấy tỉ lệ đóng góp được donate và đi donate của từng mạng xã hội 
	* API lấy thông tin dashboard top những người được donate hoặc những người đi donate ( có filter theo mạng xã hội, theo mức tuần hoặc tháng hoặc từ trước tới nay) 
	* API lấy thống kê mức độ được donate của bản thân theo từng 7 ngày/ 30 ngày/ 1 năm/ từ trước tới nay 
	* API lấy thống kê mức độ đã donate của bản thân theo từng 7 ngày/ 30 ngày/ 1 năm/ từ trước tới nay 
	* API lấy top những người donate cho bản thân nhiều nhất và số tiền 
	* API lấy top những người được bản thân donate nhiều nhất và số tiền + 1 Frontend để hiển thị các dashboard 
	* Thông tin số tài khoản và số dư, và số tiền đã nhận donate và đã donate 
	* Tỉ lệ đóng góp vào khoản được donate ở từng mạng xã hội/ tỉ lệ trên số tiền đã donate ở từng mạng xã hội của bản thân 
	* Top những người kiếm được nhiều tiền donate nhất/ đi donate nhiều nhất toàn server và thứ hạng bản thân 
	* Thống kê mức độ được donate của bản thân trong 7 ngày/ 30 ngày/ 1 năm/ từ trước tới nay 
	* Thông kê mức độ đã donate của bản thân trong 7 ngày/ 30 ngày/ 1 năm/ từ trước tới nay 
	* Top những người donate cho bản thân nhiều nhất và số tiền 
	* Top những người được bản thân donate nhiều nhất và số tiền
### Database
